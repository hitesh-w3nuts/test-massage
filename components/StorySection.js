
const StorySection = ({item}) => {
    return (
        <div className="story-section">
            <div className="container">
                <div className="section-title">
                    {(item != null && item.storyTitle != null && item.storyTitle != undefined ) && <h2 dangerouslySetInnerHTML={{ __html: item.storyTitle }}></h2>
                     }
                    {(item != null && item.storyDescription1 != null && item.storyDescription1 != undefined ) && <p dangerouslySetInnerHTML={{ __html: item.storyDescription1 }}></p>
                     }
                </div>
                <div className="story-content">
                    <div className="row">
                    {(item != null && item.storyLeftContent != null && item.storyLeftContent != undefined ) &&
                        <div className="col-lg-6">
                            <p dangerouslySetInnerHTML={{ __html : item.storyLeftContent }}></p>
                        </div>
                     }

                    {(item != null && item.storyRightContent != null && item.storyRightContent != undefined ) &&
                        <div className="col-lg-6">
                            <p dangerouslySetInnerHTML={{ __html : item.storyRightContent }}></p>
                        </div>
                     }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StorySection;