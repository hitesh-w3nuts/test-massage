import { useState } from "react";

const QnA = ({item}) => {
    
    const [id, setId] = useState("");

	const toggleHandler = (s, event) => {
		event.preventDefault();
		if (id === s) {
			setId("");
		} else {
			setId(s);
		}
	};

    return (
        <div className="question-section">
            <div className="container">
                <div className="question-wrapper">
                    <div className="row g-0">
                        <div className="col-lg-4">
                        {(item != null &&  item.faqTitle != undefined ) &&
                            <div className="section-title"><h2 dangerouslySetInnerHTML={{ __html : item.faqTitle }}></h2></div>
                        }
                        </div>

                        <div className="col-lg-8">
                            <div className="accordion-wrap">
                                <div className="accordion">

                                {(item != null &&  item.faq != undefined ) && item.faq.map((faqitem, idx ) => {
                                    return (
                                    <div className={`accordion-box ${ id === idx ? "active" : "" }`} >
                                        {(faqitem != null && faqitem.question != null && faqitem.question != undefined ) && 
                                            <h5 onClick={toggleHandler.bind(this, idx)}>{faqitem.question}<span></span></h5>
                                        }
                                        {(faqitem != null && faqitem.answer != null && faqitem.answer != undefined ) && 
                                        <div className="content">
                                            <p dangerouslySetInnerHTML={{ __html : faqitem.answer }} ></p>
                                        </div>
                                        }
                                    </div>
                                    )
                                })  
                                }

                                    {/* <div className={`accordion-box ${ id === 0 ? "active" : "" }`}>
                                    <h5 onClick={toggleHandler.bind(this, 0)} >How do make a reservation? <span></span></h5>
                                    <div className="content">
                                        <p>User experience design includes elements of interaction design, visual design, information architecture, user research, and other disciplines, and is concerned with all facts of the overall experience delivered to&nbsp;users. Following is a short analysis of its constituent parts.</p>
                                    </div>
                                    </div>

                                    <div className={`accordion-box ${ id === 1 ? "active" : "" }`}>
                                    <h5 onClick={toggleHandler.bind(this, 1)} >What if our house is small and has no yard? <span></span></h5>
                                    <div className="content">
                                        <p>User experience design includes elements of interaction design, visual design, information architecture, user research, and other disciplines, and is concerned with all facts of the overall experience delivered to&nbsp;users. Following is a short analysis of its constituent parts.</p>
                                    </div>
                                    </div>

                                    <div className={`accordion-box ${ id === 2 ? "active" : "" }`}>
                                    <h5 onClick={toggleHandler.bind(this, 2)}>What tools will be used when messaging? <span></span></h5>
                                    <div className="content">
                                        <p>User experience design includes elements of interaction design, visual design, information architecture, user research, and other disciplines, and is concerned with all facts of the overall experience delivered to&nbsp;users. Following is a short analysis of its constituent parts.</p>
                                    </div>
                                    </div>

                                    <div className={`accordion-box ${ id === 3 ? "active" : "" }`}>
                                    <h5 onClick={toggleHandler.bind(this, 3)}>How long the duration of doing the message? <span></span></h5>
                                    <div className="content">
                                        <p>User experience design includes elements of interaction design, visual design, information architecture, user research, and other disciplines, and is concerned with all facts of the overall experience delivered to&nbsp;users. Following is a short analysis of its constituent parts.</p>
                                    </div>
                                    </div>

                                    <div className={`accordion-box ${ id === 4 ? "active" : "" }`}>
                                    <h5 onClick={toggleHandler.bind(this, 4)}>Are there any hidden fee? <span></span></h5>
                                    <div className="content">
                                        <p>User experience design includes elements of interaction design, visual design, information architecture, user research, and other disciplines, and is concerned with all facts of the overall experience delivered to&nbsp;users. Following is a short analysis of its constituent parts.</p>
                                    </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default QnA;