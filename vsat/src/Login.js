import React, { useState, useEffect, useReducer } from "react";
import logo from "./img/transparent.svg";
import payment from "./img/payment.svg";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";
import useTokenStore from "./stores/tokenStore";
import useTxtStore from "./stores/txtStore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data1, setData] = useState();
  const [idd, setId] = useState("");

  const settokenStore = useTokenStore((state) => state.updateToken);

  const settxtStore = useTxtStore((state) => state.updateTxt);
  const txtStoreval = useTxtStore((state) => state.txtVal);

  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
    };

    logout();
  }, []);

  const maketxtid = async () => {
    let result = "vsat-";
    let end = ".verifydomain.vsat";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 20) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    result += end;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("txt")
      .upsert({ id: user.id, txtval: result, flag: true })
      .select();
    if (error) {
      console.log(error.message);
    }
  };

  const makeid = async () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 32) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("api")
      .upsert({ id: user.id, token: result, flag: true })
      .select();
    if (error) {
      console.log(error.message);
    }
  };

  const checktoken = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("api").select();
    if (error) {
      console.log(error.message);
    } else {
      data.map((us) => {
        if (user.email == us.email && us.flag == false) {
          makeid();
        }
      });
    }
  };

  const storeApi = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("api").select();
    console.log(data, "apival");
    data.map((us) => {
      if (user.email === us.email) {
        console.log(us.token);
        settokenStore(us.token);
      }
    });
  };

  const storeTxt = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("txt").select();
    console.log(data, "txtval");
    data.map((us) => {
      if (user.email === us.email) {
        console.log(us.txtval);
        settxtStore(us.txtval);
      }
    });
  };

  useEffect(() => {
    console.log(data1);
  }, [data1]);

  const addtoken = async (e) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("txt").select();
    if (error) {
      console.log(error.message);
    } else {
      data.map((us) => {
        if (user.email === us.email && us.flag === false) {
          maketxtid();
        }
      });

      checktoken();

      storeApi();
      storeTxt();
      console.log(txtStoreval);
    }
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
      console.log(error.message);
    }
  };
  const initialApi = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let userid = "";
    let useremail = "";
    userid = user.id;
    useremail = user.email;
    console.log(userid);
    const { data, error } = await supabase.from("api").select();
    if (error) {
      console.log(error.message);
    }
    let flag = 0;
    data.map((us) => {
      if (user.email == us.email) {
        flag = 1;
      }
    });
    console.log(flag);
    if (flag === 0) {
      const { data, error } = await supabase.from("api").insert([
        {
          id: userid,
          token: null,
          flag: false,
          email: useremail,
          domain: "",
        },
      ]);
      if (error) {
        console.log(error.message);
        return;
      } else {
        console.log("inserted api table successfully");
      }
    }
  };

  const initialTxt = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let userid = "";
    let useremail = "";
    userid = user.id;
    useremail = user.email;
    console.log(userid);
    const { data, error } = await supabase.from("txt").select();
    if (error) {
      console.log(error.message);
    }
    let flag = 0;
    data.map((us) => {
      if (user.email == us.email) {
        flag = 1;
      }
    });
    console.log(flag);
    if (flag === 0) {
      const { data, error } = await supabase.from("txt").insert([
        {
          id: userid,
          txtval: null,
          flag: false,
          email: useremail,
          status: false,
        },
      ]);
      if (error) {
        console.log(error.message);
        return;
      } else {
        console.log("inserted txt table successfully");
      }
    }
  };

  const initialPorts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let userid = "";
    let useremail = "";
    userid = user.id;
    useremail = user.email;
    console.log(userid);
    const { data, error } = await supabase.from("ports").select();
    if (error) {
      console.log(error.message);
    }
    let flag = 0;
    data.map((us) => {
      if (user.id == us.id) {
        flag = 1;
      }
    });
    console.log(flag);
    if (flag === 0) {
      const { data, error } = await supabase.from("ports").insert([
        {
          id: userid,
          created_at: null,
          openports: null,
          port_count: null,
        },
      ]);
      if (error) {
        console.log(error.message);
        return;
      } else {
        console.log("inserted port table successfully");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    // console.log(email, password);
    if (error) {
      console.log(error.message);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user.aud === "authenticated") {
        updateUser();
        initialApi();
        initialTxt();
        initialPorts();
        addtoken();

        navigate("/dashboard");
      } else {
        console.log("not authenticated");
      }

      // getSession();
      // userDetails();
    }
    // console.log(data);
  };

  const getSession = async (e) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error.message);
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

  return (
    <>
      <div className="grid grid-cols-2 gap-0 h-screen w-full min-h-screen ">
        <div className="form-pane bg-gray-900">
          <nav className="relative w-full flex flex-wrap items-center justify-between m-0">
            <div className="container-fluid w-full flex flex-wrap items-center justify-between">
              <div className="container-fluid">
                <img src={logo} style={{ height: "60px", alt: "abc" }} />
              </div>
            </div>
          </nav>
          <div className="mx-auto mt-10 w-full max-w-sm p-4  rounded-lg shadow-md sm:p-6 md:p-8 bg-gray-800 border-gray-700 ">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h5 className="text-xl font-medium text-white">
                Sign in to our platform
              </h5>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className=" border   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
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
                  className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  required
                />
              </div>
              <div className="flex items-start pb-2">
                <a
                  href="#"
                  className="ml-auto text-sm  hover:underline text-blue-500"
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
              <div className="text-sm font-medium text-gray-300">
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
        <div className="img-pane bg-gray-800 w-full h-full shadow shadow-slate-500  ">
          <img
            className="w-6/12 h-6/12 mx-auto mt-10 my-auto bg-opacity-25 flex flex-col items-center justify-center drop-shadow-md"
            src={payment}
            alt="security"
          />
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-xl font-light text-white">
                  "Social engineering bypasses all technologies, including
                  firewalls."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <div className="flex items-center divide-x-2 divide-gray-700">
                  <div className="pr-3 font-medium text-white">
                    Kevin Mitnick
                  </div>
                  <div className="pl-3 text-sm font-light text-gray-400">
                    CEO at Mitnick Security Consulting, LLC.{" "}
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
