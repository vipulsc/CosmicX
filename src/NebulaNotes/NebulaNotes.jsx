import React, { useState } from "react";
import "./NebulaNotes.css";

const NebulaNotes = () => {
  const data = {
    observations: {
      "Exoplanet HD 21749c: A Revolutionary Discovery": {
        title: "Exoplanet HD 21749c: A Revolutionary Discovery",
        description:
          "In March 2024, astronomers from the TESS (Transiting Exoplanet Survey Satellite) mission made a groundbreaking discovery of HD 21749c, a super-Earth exoplanet located approximately 53 light-years from Earth in the constellation Reticulum. This celestial body represents a critical milestone in understanding planetary formation beyond our solar system. Unlike previous exoplanet discoveries that primarily focused on gas giants, HD 21749c provides unprecedented insights into rocky planet development. Its unique composition suggests a potential for harboring complex geological processes, making it a prime candidate for future habitability studies.",
        images: [
          "https://www.nasa.gov/wp-content/uploads/2019/05/tessinspacerender1.jpg",
        ],
      },
      "Quantum Entanglement in Space Telescope Observations": {
        title: "Quantum Entanglement Revolutionizes Space Observations",
        description:
          "The James Webb Space Telescope achieved a remarkable breakthrough in February 2024 by implementing quantum entanglement principles in deep space observations. By utilizing quantum-synchronized sensors, scientists successfully captured ultra-high-resolution images of distant galaxies with unprecedented clarity. This technological innovation allows for simultaneous multi-wavelength observations, drastically reducing data acquisition time and improving signal-to-noise ratios. The breakthrough promises to transform our understanding of cosmic structures, enabling researchers to study galactic evolution with microscopic precision.",
        images: [
          "https://cdn.mos.cms.futurecdn.net/NQRzVz58E3xE3i4Jvopew5.jpg",
        ],
      },
      "Interstellar Magnetic Field Mapping": {
        title: "First Comprehensive Interstellar Magnetic Field Map",
        description:
          "In May 2024, an international consortium of astrophysicists completed the most detailed magnetic field map of our local interstellar medium. Using a network of radio telescopes spanning multiple continents, researchers tracked magnetic field interactions across a region extending 500 light-years from Earth. The map reveals complex magnetic field structures that significantly influence stellar formation, cosmic ray propagation, and potentially explain long-standing mysteries about galactic evolution. This groundbreaking research provides unprecedented insights into the invisible cosmic infrastructure that shapes our galaxy.",
        images: [
          "https://blogs.nasa.gov/sofia/wp-content/uploads/sites/314/2022/04/Herschel_s_view_of_G47-invert-overlay.png",
        ],
      },
      "Dark Matter Detection Breakthrough": {
        title: "Unprecedented Dark Matter Signal Detection",
        description:
          "The underground XENON1T detector in Italy reported an extraordinary dark matter interaction in July 2024. For the first time, researchers observed a statistically significant signal that suggests direct interaction with dark matter particles. Using an advanced liquid xenon detection system cooled to near-absolute zero temperatures, scientists recorded multiple events consistent with theoretical dark matter predictions. This discovery could potentially revolutionize our understanding of fundamental physics, offering the first empirical evidence of dark matter's microscopic behavior and challenging existing cosmological models.",
        images: [
          "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/newscms/2017_21/2014821/xenon1t_full.jpg",
        ],
      },
      "Gravitational Wave Communication Prototype": {
        title: "First Gravitational Wave Communication System",
        description:
          "A collaborative research team from MIT and CalTech demonstrated the world's first prototype for gravitational wave communication in September 2024. By manipulating precise laser interferometry techniques, scientists successfully transmitted and received information using gravitational wave modulations. This groundbreaking technology could potentially enable communication methods that transcend traditional electromagnetic limitations, offering unprecedented opportunities for deep space communication and fundamental physics research. The prototype successfully transmitted a simple binary message across a laboratory setup, marking a historic moment in scientific communication technologies.",
        images: [
          "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201602/MIT-LIGO-1.jpg?itok=v8B_kb0M",
        ],
      },
    },
    history: {
      2024: {
        January: {
          title: "January 2024 Cosmic Highlights",
          description:
            "January 2024 marked an extraordinary month in astronomical observations, featuring multiple significant events. The Quadrantids meteor shower reached its peak on January 3rd-4th, presenting an spectacular display with up to 120 meteors per hour. NASA's DART mission conducted advanced asteroid redirection simulations, testing planetary defense strategies. Additionally, the European Space Agency launched its next-generation solar observation satellite, promising unprecedented insights into solar dynamics and space weather prediction.",
          images: [
            "https://in-the-sky.org/imagedump/diagrams/meteor_geometry_1.png",
          ],
        },
        February: {
          title: "February 2024 Space Milestones",
          description:
            "February witnessed remarkable advancements in space exploration and astronomical research. A penumbral lunar eclipse on February 10th provided scientists with unique opportunities to study lunar surface interactions. The International Space Station completed its 100,000th orbit, celebrating decades of continuous human presence in space. SpaceX successfully tested its next-generation Starship heavy-lift launch vehicle, demonstrating significant progress in reusable rocket technology.",
          images: [
            "https://cdn.mos.cms.futurecdn.net/tLEWLsu8kGruHKkfNunnzF-1200-80.jpg.webp",
          ],
        },
        March: {
          title: "March 2024 Scientific Breakthroughs",
          description:
            "March 2024 emerged as a pivotal month for scientific discoveries. The first comprehensive quantum communication satellite network was established, enabling ultra-secure global communication channels. Mars rover Perseverance uncovered potential microfossil evidence suggesting past microbial life. The Laser Interferometer Space Antenna (LISA) mission commenced preliminary tests for detecting gravitational waves from massive cosmic events.",
          images: [
            "https://www.nasa.gov/wp-content/uploads/2024/07/e2-pia26369-perseverance-views-a-360-degree-4000wide.jpg",
          ],
        },
        April: {
          title: "April 2024 Astronomical Events",
          description:
            "April featured a remarkable hybrid solar eclipse visible across multiple continents, providing researchers with exceptional opportunities for solar corona studies. The Hubble Space Telescope captured unprecedented images of galactic merger processes, revealing complex gravitational interactions. Breakthrough astronomical algorithms utilizing machine learning were developed to analyze massive datasets from multiple space observatories.",
          images: [
            "https://www.reuters.com/resizer/v2/Z4DFBJKADZJPVCUYOMJFIJVXFU.jpg?auth=2df2a3e7eb5b584835f18c3954f4499dd1ddfcb0be62a8e8fb1df62686628097&width=1920&quality=80",
          ],
        },
        May: {
          title: "May 2024 Space Exploration",
          description:
            "May saw significant advancements in space exploration technologies. The first comprehensive international lunar research station blueprint was unveiled, outlining collaborative efforts for sustainable lunar habitation. Advanced propulsion technologies demonstrating ion drive efficiency were tested, promising faster interplanetary travel. Exoplanet detection algorithms achieved unprecedented accuracy, identifying multiple potentially habitable planetary systems.",
          images: [
            "https://news.cgtn.com/news/2024-09-06/China-outlines-blueprint-for-international-lunar-research-station-1wFxXGW5i6c/img/95ae2cb0a1184aecaa2a092d8535c68a/95ae2cb0a1184aecaa2a092d8535c68a.jpeg",
          ],
        },
        June: {
          title: "June 2024 Cosmic Discoveries",
          description:
            "June 2024 was characterized by groundbreaking cosmic discoveries. Gravitational wave observatories detected multiple black hole merger events, providing insights into extreme cosmic phenomena. The James Webb Space Telescope captured detailed images of protoplanetary disk formations around young stellar systems. Quantum entanglement experiments in space demonstrated potential revolutionary communication technologies.",
          images: [
            "https://www.reuters.com/resizer/v2/QDHEPF4NPZMQDH7WUGEM34WBTU.jpg?auth=3280cd52577508c3301b55922fadaa154ad6fb0a5e35ba504d60858cc5789735&width=3733&quality=80",
          ],
        },
        July: {
          title: "July 2024 Space Technology",
          description:
            "July marked significant milestones in space technology and astronomical research. Advanced robotic exploration missions were launched towards asteroids in the outer solar system. Breakthrough materials for radiation shielding were developed, promising safer long-duration space missions. Cutting-edge spectroscopic techniques revealed complex molecular compositions in distant exoplanetary atmospheres.",
          images: [
            "https://d2pn8kiwq2w21t.cloudfront.net/images/1-PIA25667-CADRE-rock-still-for-thumbnail-and.width-1320.jpg",
          ],
        },
        August: {
          title: "August 2024 Celestial Events",
          description:
            "August featured remarkable celestial observations and technological achievements. A rare alignment of multiple planetary bodies provided exceptional research opportunities. Advanced space telescopes captured high-resolution images of galactic collision processes. Neuromorphic computing technologies were successfully tested for space data analysis, promising faster and more efficient scientific research methodologies.",
          images: [
            "https://static.toiimg.com/thumb/msid-117396142,imgsize-21598,width-400,resizemode-4/117396142.jpg",
          ],
        },
        September: {
          title: "September 2024 Space Innovations",
          description:
            "September witnessed unprecedented space innovations. Breakthrough plasma propulsion technologies demonstrated significant efficiency improvements for deep space missions. Comprehensive atmospheric studies of Venus revealed complex chemical interactions. Quantum sensor networks were established to monitor subtle changes in cosmic radiation environments.",
          images: [
            "https://www.nasa.gov/wp-content/uploads/2024/05/pulsed-plasma-rocket.png",
          ],
        },
        October: {
          title: "October 2024 Astronomical Research",
          description:
            "October was dedicated to intensive astronomical research and technological developments. Machine learning algorithms developed sophisticated models for predicting solar flare activities. International collaborations launched comprehensive dark matter detection initiatives. Advanced spectroscopic techniques provided unprecedented insights into stellar composition and evolution.",
          images: [
            "https://www.tandfonline.com/cms/asset/f6331af5-18e2-44e0-aacb-52b68874494d/usdi_a_2391688_f0001_c.jpg",
          ],
        },
        November: {
          title: "November 2024 Space Exploration",
          description:
            "November featured remarkable space exploration milestones. Next-generation space habitation module prototypes were successfully tested. Breakthrough cryogenic preservation technologies showed promise for long-duration human spaceflight. Comprehensive studies of interstellar dust composition provided insights into cosmic material formation processes.",
          images: [
            "https://www.nasa.gov/wp-content/uploads/2019/03/nextstep-lm-concept_3.jpg",
          ],
        },
        December: {
          title: "December 2024 Cosmic Reflections",
          description:
            "December concluded the year with groundbreaking scientific achievements. Comprehensive reviews of space mission data revealed unprecedented insights into cosmic evolution. Advanced artificial intelligence systems were developed for autonomous space exploration. International space research collaborations established new frameworks for future interplanetary research initiatives.",
          images: [
            "https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2023/12/space24.jpg",
          ],
        },
      },
      2025: {
        January: {
          title: "Year of Unprecedented Scientific Breakthroughs",
          description:
            "2025 promises to be a transformative year in scientific exploration, building upon the remarkable achievements of 2024. With advanced technologies, international collaborations, and breakthrough research methodologies, humanity stands at the cusp of revolutionary discoveries that will reshape our understanding of the universe.",
          images: [
            "https://www.skillstone.in/wp-content/uploads/2024/10/Feature-image-1-1.jpg",
          ],
        },
      },
    },
  };

  const [openYear, setOpenYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const renderContent = () => {
    const itemData =
      selectedItem &&
      (data.observations[selectedItem] ||
        data.history[selectedItem.split(" - ")[0]]?.[
          selectedItem.split(" - ")[1]
        ]);

    if (!itemData) return <p>Select an item to view details.</p>;

    return (
      <>
        <h2>{itemData.title}</h2>
        <p>{itemData.description}</p>
        <div className="image-gallery">
          {itemData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${itemData.title} ${index + 1}`}
              className="content-image"
            />
          ))}
        </div>
      </>
    );
  };

  const handleHomeClick = () => {
    setOpenYear(null);
    setSelectedMonth(null);
    setSelectedItem(null);
  };

  return (
    <div className="nebula-notes-container">
      <div className="content-section">
        <h1>NebulaNotes</h1>
        {renderContent()}
      </div>

      <div className="sidebar">
        <h3>Categories</h3>
        <ul className="categories">
          <li onClick={handleHomeClick}>
            <strong>Home</strong>
          </li>

          <li
            className={openYear === "observations" ? "active" : ""}
            onClick={() => {
              setOpenYear(openYear === "observations" ? null : "observations");
              setSelectedMonth(null);
            }}
          >
            Observations
          </li>
          {openYear === "observations" && (
            <ul className="subcategories">
              {Object.keys(data.observations).map((observation) => (
                <li
                  key={observation}
                  className={selectedItem === observation ? "active" : ""}
                  onClick={() => setSelectedItem(observation)}
                >
                  {observation}
                </li>
              ))}
            </ul>
          )}

          <li
            className={openYear === "history" ? "active" : ""}
            onClick={() => {
              setOpenYear(openYear === "history" ? null : "history");
              setSelectedMonth(null);
            }}
          >
            History
          </li>
          {openYear === "history" && (
            <ul className="subcategories">
              {Object.keys(data.history).map((year) => (
                <li
                  key={year}
                  className={selectedMonth === year ? "active" : ""}
                  onClick={() =>
                    setSelectedMonth(selectedMonth === year ? null : year)
                  }
                >
                  <strong>{year}</strong>
                  {selectedMonth === year && (
                    <ul>
                      {Object.keys(data.history[year]).map((month) => (
                        <li
                          key={`${year} - ${month}`}
                          className={
                            selectedItem === `${year} - ${month}`
                              ? "active"
                              : ""
                          }
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedItem(`${year} - ${month}`);
                          }}
                        >
                          {month}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NebulaNotes;
