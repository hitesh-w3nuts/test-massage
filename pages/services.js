import { Fragment } from "react";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";

import BackBtn from "@/components/layout/BackBtn";
import MassageBox from "@/components/MassageBox";

import MassageModal from "@/components/MassageModal";

import { ApiContext } from "@/contexts/ApiContext";

const Services = (props) => {
  const {servicesApi} = useContext(ApiContext);
  const [services, setServices] = servicesApi;
  const [sidebarProduct, setSidebarProduct] = useState(false);
  useEffect(() => {
    if (services.length) {
      document.body.classList.add("loaded");
    }
  }, [services]);
  return (
    <Fragment>
      <Head>
        <title>Services - Massage MNL</title>
      </Head>
      <div className="inner_wapper services">
        <div className="container">
          {/* <BackBtn /> */}

          {/* massage-row */}
          { (services !== null) &&
            Object.entries(services).map(([key, item], i) => (
              <div key={i} className="massage-row">
                <h1 className="h3">{item.name}</h1>
                <div className="description" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                <div className="row">
                  {item.products.map((product, i) => (
                    <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                      <MassageBox product={product} setSidebarProduct={setSidebarProduct} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
          
          {/* massage-row */}

          {/* massage-row *}
          <div className="massage-row">
            <h1 className="h3">Premium Massages</h1>
            <div className="description">
              <p>
                These massages will soothe, relieve stress, and offer
                relaxation.
              </p>
              <p>
                With techniques that usually start with general strokes to
                specific problem areas and localized pressure, choose a service
                that best fits your body and well-being needs.
              </p>
            </div>

            <div className="row">
              {MASSAGEBOXINFO1.map((msbox) => (
                <div className="col-xl-3 col-lg-4 col-md-6" id={msbox.id}>
                  <MassageBox massbox={msbox} />
                </div>
              ))}
            </div>
          </div>
          {/* massage-row */}
        </div>
      </div>
      <MassageModal product={sidebarProduct} />
    </Fragment>
  );
};
export default Services;
