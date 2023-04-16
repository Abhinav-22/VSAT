import React, { useState, useEffect } from "react";
import logo from "./img/transparent.svg";
import payment from "./img/payment.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(null);
  const [txtval, setTxtval] = useState();
  const [tokenval, setTokenval] = useState();

  const [res, setRes] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
    };
    logout();
    function maketxtid(length) {
      let result = "vsat-";
      let end = ".verifydomain.vsat";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      result += end;
      return result;
    }
    setTxtval(maketxtid(16));

    function makeid(length) {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    }

    setTokenval(makeid(20));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    // console.log(email, password);
    if (error) {
      alert(error.message);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user.aud == "authenticated") {
        updateUser();
        addtoken();

        navigate("/dashboard");
      } else {
        alert("not authenticated");
      }

      // getSession();
      // userDetails();
    }
    // console.log(data);
  };

  const getSession = async (e) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      alert(error.message);
    } else {
      console.log(data);
    }
  };

  const userDetails = async (e) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user.id);
    console.log(user.email);
    console.log(user.aud);
  };

  const updateUser = async (e) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("users")
      .update({ uuid: user.id })
      .eq("email", user.email);
    if (error) {
      alert(error.message);
    }
  };

  const updateRes = (e) => {
    console.log(e);
    setRes(e);
  };

  const addtoken = async (e) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("txt").select();
    if (error) {
      alert(error.message);
      updateRes(null);
    }
    if (data) {
      updateRes(data);
      console.log(res);

      res.map((us) => {
        if (user.email == us.domain && us.flag == false) {
          console.log(us);
          console.log(us.email);
          console.log(us.flag);
        }
      });

      const { error } = await supabase
        .from("txt")
        .update({ txt: txtval })
        .eq("domain", user.website);
      if (error) {
        alert(error.message);
      }

      console.log(data);
      console.log(txtval);
      console.log(tokenval);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-0 h-screen w-full ">
        <div className="form-pane bg-gray-900">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <div className="container-fluid">
                <img src={logo} style={{ height: "90px", alt: "abc" }} />
              </div>
            </div>
          </nav>
          <div className="mx-auto mt-10 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h5>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-start pb-2">
                <a
                  href="#"
                  className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div>
              <Link to="">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
              </Link>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <Link
                  to="/register"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="img-pane bg-gray-700 w-full h-full ">
          <img
            className="w-10/12 h-10/12 mx-10 mt-10 mb-10 bg-opacity-25"
            src={payment}
            alt="security"
          />
          <p className="mb-3 text-lg font-medium text-gray-900 md:text-xl dark:text-white text-center ">
            {" "}
            "If it's smart, it's vulnerable"
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
