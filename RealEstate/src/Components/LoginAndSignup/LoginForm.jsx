import React, { useContext, useRef } from 'react'
import { myContext } from '../Store/Context';

const LoginForm = ({isUpdate}) => {
  const { handleLoginFunc, setEmail, setPassword, handleUpdateFuc } =
    useContext(myContext);

  return (
    <form className="flex flex-col gap-2 my-3">
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        name="email"
        className=" border-2 border-black py-2 px-1"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        placeholder="Password"
        name="password"
        className=" border-2 border-black py-2 px-1"
      />
          {!isUpdate ? <button
              onClick={(e) => {
                  e.preventDefault();
                  handleLoginFunc();
              }}
              type="submit"
              className="text-center bg-blue-600"
          >
              SIGN IN
          </button> :
              <button
                  onClick={(e) => {
                      e.preventDefault();
                      handleUpdateFuc();
                  }}
                  type="submit"
                  className="text-center bg-blue-600"
              >
                  UPDATE
              </button>}
    </form>
  );
};

export default LoginForm
