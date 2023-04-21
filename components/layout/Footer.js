import Image from "next/image";
import { post } from "@/helpers/api_helper";
import { useState, useEffect, useRef } from "react";
import { footerQuery } from "@/helpers/api_gq_query_helper";

import footerLogo from "../../assets/image/logo-w.png";
import fbIcon from "../../assets/image/fb-Icon.svg";
import instaIcon from "../../assets/image/insta-Icon.svg";
import titkIcon from "../../assets/image/tiktok-Icon.svg";
import ytIcon from "../../assets/image/yt-Icon.svg";


import { multipart_post } from "@/helpers/api_helper";
import SimpleReactValidator from "simple-react-validator";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";

const Footer = () => {

  const [footerData, setfooterData] = useState(null);
  useEffect(() => {
    if (footerData == null) {
      const getData = async () => {
        const res = await post('api/graphql', footerQuery);
        if (res.data != undefined && res.data != null && res.data.themeFooterSettings != undefined && res.data.themeFooterSettings.footerSettings != null && res.data.themeFooterSettings.footerSettings != undefined && res.data.themeFooterSettings.footerSettings != null) {
          setfooterData(res.data.themeFooterSettings.footerSettings);
        }
      }
      getData();
    }
  });

  const [formInput, setFormInput] = useState({ email: ''});
    const simpleValidator = useRef(new SimpleReactValidator());
    const [forceUpdate, setForceUpdate] = useState();
    const [Error, SetError] = useState("");
    const [SuccessMessageText, SetSuccessMessageText] = useState("");

    // input text change handler
    const handleInputChange = (event) => {
        event.persist();
        setFormInput((inputs) => ({ ...formInput, [event.target.name]: event.target.value }));
    };

    // form submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages(true);
            setForceUpdate(1);
        } else {
            SetError("");
            const result = await multipart_post('wp-json/contact-form-7/v1/contact-forms/50/feedback', formInput, { 'content-type': "application/json" });
            if (result.status !== 'validation_failed') {
                SetSuccessMessageText(result.message);
                setFormInput({ email: ''})
                setTimeout(function () {
                    SetSuccessMessageText('');
                }, 2000);
            } else {
                SetError(result.message);
                setTimeout(function () {
                    SetError('');
                }, 5000);
            }
        }
    }
  const year = 2023;
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="logobox">
          {(footerData != null && footerData.footerLogo != null && footerData.footerLogo != undefined) &&
            <a href="#">
              <Image src={footerData.footerLogo.sourceUrl} alt="logo" width={304} height={48} />
            </a>
          }
        </div>

        <div className="row">
          <div className="col-md-auto">
            <div className="ftbox">
              {(footerData != null && footerData.visitText != null && footerData.visitText != undefined) &&
                <h4 dangerouslySetInnerHTML={{ __html: footerData.visitText }}></h4>
              }
              {(footerData != null && footerData.adreess != null && footerData.adreess != undefined) &&
                <address dangerouslySetInnerHTML={{ __html: footerData.adreess }}></address>
              }
            </div>
          </div>
          <div className="col-md-auto">
            <div className="ftbox">
              {(footerData != null && footerData.contactText != null && footerData.contactText != undefined) &&
                <h4 dangerouslySetInnerHTML={{ __html: footerData.contactText }}></h4>
              }
              <p>
                {(footerData != null && footerData.contactNumber != null && footerData.contactNumber != undefined) &&
                  <a href={`tel:${footerData.contactNumber}`} dangerouslySetInnerHTML={{ __html: footerData.contactNumber }} ></a>
                }
              </p>
              <p>
                {(footerData != null && footerData.contactEmail != null && footerData.contactEmail != undefined) &&
                  <a href={`mailto:${footerData.contactEmail}`} dangerouslySetInnerHTML={{ __html: footerData.contactEmail }} ></a>
                }
              </p>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="ftbox">
              {(footerData != null && footerData.findText != null && footerData.findText != undefined) &&
                <h4 dangerouslySetInnerHTML={{ __html: footerData.findText }}></h4>
              }
              <div className="social">
                <ul>
                  <li>
                    {(footerData != null && footerData.facebookLink != null && footerData.facebookLink != undefined) &&
                      <a href={footerData.facebookLink} target="_blank">
                        <Image src={fbIcon} alt="fbIcon" />
                      </a>
                    }

                  </li>
                  <li>
                    {(footerData != null && footerData.instagramLink != null && footerData.instagramLink != undefined) &&
                      <a href={footerData.instagramLink} target="_blank">
                        <Image src={instaIcon} alt="instaIcon" />
                      </a>
                    }
                  </li>
                  <li>
                    {(footerData != null && footerData.youtubeLink != null && footerData.youtubeLink != undefined) &&
                      <a href={footerData.youtubeLink} target="_blank">
                        <Image src={ytIcon} alt="ytIcon" />
                      </a>
                    }
                  </li>
                  <li>
                    {(footerData != null && footerData.tiktokLink != null && footerData.tiktokLink != undefined) &&
                      <a href={footerData.tiktokLink} target="_blank">
                        <Image src={titkIcon} alt="titkIcon" />
                      </a>
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="ftbox">
              {(footerData != null && footerData.formTitle != null && footerData.formTitle != undefined) &&
                <h4 dangerouslySetInnerHTML={{ __html: footerData.formTitle }}></h4>
              }
              <div className="newsletter">
                <div >
                  <form onSubmit={handleSubmit} >
                    <input type="email" name="email" className="input-text" value={formInput.email} onChange={handleInputChange} placeholder="Email address" />
                    <input type="submit" value="submit" />
                    {simpleValidator.current.message("email", formInput.email, "required|email", {
                        className: "error-message",
                        messages: { required: "Please enter email", email: "Please enter valid email" }
                    })}
                    <ErrorMessage message={Error} />
                    <SuccessMessage message={SuccessMessageText} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="copyright">
        {(footerData != null && footerData.copyrightText != null && footerData.copyrightText != undefined) &&
          <p dangerouslySetInnerHTML={{ __html: footerData.copyrightText.replace("%s", year) }}></p>
        }
      </div>
    </footer>
  );
};

export default Footer;
