

const Input = ({label,name,formik,type,placeholder}) => {
  return (
        <div>
            <div className="emailInput mb4">
            <label htmlFor={name} >{label}</label>
            <div className="icon-email">
              <input
                className={formik.errors[name] && formik.touched[name] ? "error-border" : null}
                id={name}
                type = {type}
                name={name}
                {...formik.getFieldProps(name)}
                placeholder={placeholder}
              />
              {formik.errors[name] && formik.touched[name] && (
                <div className="error">{formik.errors[name]}</div>
              )}
            </div>
          </div>
        </div>
    );
}
 
export default Input; 