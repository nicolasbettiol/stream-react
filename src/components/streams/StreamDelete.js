import React from 'react';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    };

    deleteStream = () => {
        this.props.deleteStream(this.props.match.params.id);
    };
    
    renderActions = () => {        
        return (
            <React.Fragment>
                <button onClick={this.deleteStream} className="ui primary button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    };

    renderContent = () => {
        if(!this.props.stream){
            return 'Are you sure?'
        }
        return `Are you sure to remove ${this.props.stream.id}?`
    };

    render(){
        return(
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                ></Modal>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);