import "./Articles.scss";
import data from "./Data";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import logo from "./logo.jpg";
import foxlogo from "./fox.png";

export default function ShowArticles() {
  return (
    <div className="articles-main">
      <h2 id="articles-header">Latest News</h2>
      {data.articles.map((article) => (
        <div className="articles">
          <div className="article" key={article.title}>
            <Card css={{ w: "100%", h: "300px" }} id="cardNews">
              <Card.Header
                css={{ position: "absolute", zIndex: 1, top: 5 }}
                id="cardHeader"
              >
                <Col>
                  <Text
                    size={12}
                    weight="bold"
                    transform="uppercase"
                    color="#9E9E9E"
                  >
                    {article.author}
                  </Text>
                  <Text h3 color="white">
                    {article.title}
                  </Text>
                </Col>
              </Card.Header>
              <Card.Body css={{ p: 0 }} id="cardBody">
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
                id="cardFooter"
                css={{
                  position: "absolute",
                  bgBlur: "#0f111466",
                  borderTop: "$borderWeights$light solid $gray800",
                  bottom: -30,
                  zIndex: 1,
                }}
              >
                <Row>
                  <Col>
                    <Row>
                      <Col span={4}>
                        <Card.Image
                          id="littlePic"
                          src={foxlogo}
                          height={50}
                          width={40}
                          alt="News app icon"
                        />
                      </Col>
                      <Col>
                        <Text
                          color="#d1d1d1"
                          size={12}
                          id="appnameInCardFooter"
                        >
                          Fox Ticket App
                        </Text>
                        <Text
                          color="#d1d1d1"
                          size={11}
                          id="fewWordsInCardFooter"
                        >
                          Read an interesting story.
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row justify="flex-end">
                      <Button
                        id="readButton"
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
