import { app, database } from "../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { set, ref, getDatabase, onValue } from "firebase/database";
import md5 from "md5";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  cleanUser,
  setUser,
  toggleLoading,
  toggleSnackBar,
} from "../redux/actions";

export const useFirebase = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const db = getDatabase(app);
  const dispatch = useDispatch();
  const showSnack = (txt, severity = "success") => {
    dispatch(
      toggleSnackBar({
        message: txt,
        show: true,
        severity,
      })
    );
  };
  const authChange = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        dispatch(setUser(user));
      } else {
        navigate("/login");
        dispatch(cleanUser(null));
      }
    });
  };
  const register = (email, password, userName) => {
    dispatch(toggleLoading(true));
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: userName,
          photoURL: `http://gravatar.com/avatar/${md5(
            userCredential.user.email
          )}?d=identicon`,
        }).then(() => {
          insert(
            {
              name: userCredential.user.displayName,
              avatar: userCredential.user.photoURL,
            },
            userCredential.user.uid,
            "users"
          );
          navigate("/login");
          showSnack("کاربر افزوده شد");
        });
      })
      .catch((error) => {
        if (error !== undefined) {
          if (error.code === "auth/email-already-in-use") {
            showSnack("ایمیل از قبل وارد شده", "error");
          }
          if (error.code === "auth/network-request-failed") {
            showSnack("از متصل بودن اینترنت مطمئن شوید", "error");
          }
        }
      })
      .finally(() => dispatch(toggleLoading(false)));
  };
  const insert = (data, id, table) => {
    return set(ref(database, `${table}/` + id), data);
  };
  const get = (table, callback) => {
    dispatch(toggleLoading(true));
    const tableFirbase = ref(db, `${table}/`);
    onValue(tableFirbase, (snapshot) => {
      const data = snapshot.val();
      dispatch(toggleLoading(false));
      callback(Object.values(data));
    });
  };
  const login = (email, password) => {
    dispatch(toggleLoading(true));
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showSnack("خوش آمدید");
      })
      .finally(() => dispatch(toggleLoading(false)))
      .catch((error) => {
        if (error !== undefined) {
          if (error.code === "auth/network-request-failed") {
            showSnack("از متصل بودن اینترنت مطمئن شوید", "error");
          }
          if (error.code === "auth/user-not-found") {
            showSnack("کاربری یافت نشد", "error");
          }
        }
      });
  };
  const logout = () => {
    signOut(auth);
  };
  return { register, get, insert, logout, login, authChange };
};
