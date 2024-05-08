import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setpasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text"; // Show password
    console.log(ref.current.src);
    if (ref.current.src.includes("/eye.png")) {
      ref.current.src = "/eye0.png";
      passwordRef.current.type = "password"; // Hide password
    } else {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "text"; // Show password
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "password",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      
    } else {
      
    }
  };

  const deletePassword = (id) => {
    console.log("Deleting password with id :", id);
    let c = confirm("Do you really want to delete your password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "password",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id :", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      </div>
      <div className="p-2 pt-3 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="text-white flex flex-col p-4 text-black gap-8  items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            style={{ color: "black" }}
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              style={{ color: "black" }}
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                style={{ color: "black" }}
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="/eye0.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-3xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div>No Password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>Site</th>
                  <th>username</th>
                  <th>password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2 border border-black w-32 text-black">
                        <div className="flex items-center justify-center gap-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/jdsvypqr.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center py-2 border border-black w-32">
                        <div className="flex items-center justify-center gap-2">
                          {item.username}
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/jdsvypqr.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-black w-32">
                        <div className="flex items-center justify-center gap-2">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/jdsvypqr.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-black w-32">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            state="hover-line"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="morph"
                            state="morph-trash-out"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Manager;
