import React from 'react';
import { Field, reduxForm } from 'redux-form';  // reduxForm() is like connect()

class StreamForm extends React.Component {

  renderError({error, touched}) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    };
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label> { label } </label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {              // if the inputs are valid this onSubmit is invoked
    this.props.onSubmit(formValues)         // onSubmit calls the callback it was passed from a parent comp
  };

  render() { 
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary"> Submit </button>
      </form>
    );
  };

};

const validate = (formValues) => {    // formValues has all the values of our form 
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  } 
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

// reduxForm() makes sure we can call an action creator & get some form data into our component
// reduxForm() returns a function (the 2nd function) & we immediately call that 2nd function w/ StreamCreate
// export default reduxForm({
//   form: 'streamCreate',
//   validate
// })(StreamCreate);

export default reduxForm({   // StreamForm is wrapped in a reduxForm
  form: 'streamForm',
  validate
})(StreamForm);
