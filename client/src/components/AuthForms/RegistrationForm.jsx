import React from "react";
import "./styles.scss";
import { withTranslation } from 'react-i18next';

const RegistrationForm = ({t}) => {
  return (
    <div className="w-full max-w-xs form-registration">
      <form className=" px-8 pt-6 pb-8 ">
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="first-name"
            type="text"
            placeholder={t('AuthForms.firstName')}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="last-name"
            type="text"
            placeholder={t('AuthForms.lastName')}
          />
        </div>
        <div className="mb-2">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder={t('AuthForms.email')}
          />
          <p className="mt-1 text-xs italic text-justify">
          {t('AuthForms.sendConfirm')}
          </p>
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*************"
          />
          <p className="mt-1 text-xs italic text-justify">
          {t('AuthForms.atLeast')}
          </p>
        </div>
        <div className="mb-4">
          <label className="block uppercase text-xs font-bold mb-1">
          {t('AuthForms.gender')}
          </label>
          <select
            className="block appearance-none w-full py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            id="gender"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Unspecified</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block uppercase text-xs font-bold mb-1">
          {t('AuthForms.dateBirth')}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            placeholder="Day"
          />
        </div>
        <div className="mb-4">
          <label className="block uppercase text-xs font-bold mb-1">
          {t('AuthForms.country')}
          </label>
          <select
            className="block appearance-none w-full py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            id="country"
          >
            <option>Ukraine</option>
            <option>US</option>
            <option>Germany</option>
          </select>
        </div>

        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase text-xs font-bold mb-1">
            {t('AuthForms.code')}
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                id="code"
              >
                <option>050</option>
                <option>066</option>
                <option>095</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
            <label className="block uppercase text-xs font-bold mb-1">
            {t('AuthForms.mobile')}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="mobile"
              type="text"
              placeholder="xx-xx-xxx"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="font-medium  py-2 px-4 border  sign-up-btn"
          >
            {t('AuthForms.signup')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default withTranslation()(RegistrationForm);
