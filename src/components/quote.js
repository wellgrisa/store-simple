import React from 'react';

class Quote extends React.Component {

    static defaultProps = {
        isEditing : false
    }

    onAdding(e) {
      this.props.onAdding()      
      const { quote, who } = this.refs;

      quote.setAttribute('contenteditable', 'true');
      who.setAttribute('contenteditable', 'true');
      quote.focus();
      quote.innerHTML = '';
    }

    onSave(){

    }

    renderPencil(){
      if(this.props.isEditing){
        return null;
      }

      return <span style={{ float : 'right', marginLeft: 10}} onClick={::this.onAdding} className={'glyphicon glyphicon-pencil'}></span>
    }

    render() {
        const { quote, onRefreshClick } = this.props;

        return <div className='quote-box'>
          <div>
            <div style={{cursor: 'pointer'}}>
              <span onClick={onRefreshClick} className="glyphicon glyphicon-refresh"></span>
              {this.renderPencil()}
              <span style={{ float : 'right'}} onClick={onRefreshClick} className="glyphicon glyphicon-ok"></span>
            </div>

            <p ref='quote' className="quote-paragraph">{quote.text}</p>
            <label ref='who' className='quote-who'>
                {quote.who}
            </label>
          </div>
        </div>
    }
}

export default Quote;
