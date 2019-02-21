import React from 'react';
import { reduxForm, Field} from 'redux-form'

class StreamForm extends React.Component {

    renderError = ({ error, touched }) => {
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error': ''}`;
        return(
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input}/>
                {this.renderError(formProps.meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };
    
    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
                <Field name="title" component={this.renderInput} label="Enter Title"></Field>
                <Field name="description" component={this.renderInput} label="Enter Description"></Field>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
};

const validate = (formValues) => {
    const error = {};
    if(!formValues.title){
        error.title="Add title";
    }
    if(!formValues.description){
        error.description="Add description";
    }

    return error;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
