import "./Articles.scss";
import data from "./Data";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import logo from "./logo.jpg";
import foxlogo from "./fox.png";

export default function ShowArticles(){
  return(
      <div className="articles-main">
      <h2 id="articles-header">Latest News</h2>
      {data.articles.map((article) => (
        <div className="articles">
          <div className="article" key={article.title}>
            <Card css={{ w: "100%", h: "400px" }}>
              <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col>
                  <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                    {article.author}
                  </Text>
                  <Text h3 color="white">
                    {article.title}
                  </Text>
                </Col>
              </Card.Header>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={logo}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  alt="News app background"
                />
              </Card.Body>
              <Card.Footer
                isBlurred
                css={{
                  position: "absolute",
                  bgBlur: "#0f111466",
                  borderTop: "$borderWeights$light solid $gray800",
                  bottom: 0,
                  zIndex: 1,
                }}
              >
                <Row>
                  <Col>
                    <Row>
                      <Col span={3}>
                        <Card.Image id="littlePic"
                          src={foxlogo}
                          css={{ bg: "black", br: "50%" }}
                          height={80}
                          width={70}
                          alt="Breathing app icon"
                        />
                      </Col>
                      <Col>
                        <Text color="#d1d1d1" size={12}>
                          Fox Ticket App
                        </Text>
                        <Text color="#d1d1d1" size={11}>
                          Read an interesting story.
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row justify="flex-end">
                      <Button id="readButton"
                        flat
                        auto
                        rounded
                        css={{ color: "#94f9f0", bg: "#94f9f026" }}
                      >
                        <Text
                          css={{ color: "white" }}
                          size={12}
                          weight="bold"
                          transform="uppercase"
                        >
                          READ
                        </Text>
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
        </div>
      </div>
    ))}
    </div>
  );
}

// export default function ShowArticles() {
//   return (
//     <div className="articles-main">
//       <h2 id="articles-header">Latest News</h2>
//       {data.articles.map((article) => (
//         <div className="articles">
//           <div className="article" key={article.title}>
//             <p className="article-title">{article.title}</p>
//             <p className="article-text">{article.text}</p>
//             <p className="article-author">{article.author}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
