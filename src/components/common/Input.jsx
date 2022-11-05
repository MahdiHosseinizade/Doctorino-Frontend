

const Input = ({label,name,formik}) => {
    return (
        <div>
            <div className="emailInput mb4">
            <label >{label}</label>
            <div className="icon-email">
              <input
                type = {name}
                className={name}
                placeholder={name}
                name={name}
                {...formik.getFieldProps(name)}
              />
              {formik.errors[name] && formik.touched[name] && (
                <div className="error">{formik.errors[name]}</div>
              )}
              {/* <AiOutlineMail className="icon" /> */}
            </div>
          </div>
        </div>
    );
}
 
export default Input;