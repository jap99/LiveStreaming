import React from 'react';
import { Field, reduxForm } from 'redux-form';  // reduxForm() is like connect()
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {

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

  onSubmit = (formValues) => {  // if the inputs are valid this onSubmit is invoked
    this.props.createStream(formValues) // onSubmit calls our action creator createStream
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

const formWrapped = reduxForm({   // creating a formWrapped version of our streamCreate comp
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);