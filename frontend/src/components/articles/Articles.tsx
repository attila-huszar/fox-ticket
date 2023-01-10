import './Articles.css';
import data from './article_data';
import { Card, Col, Text, Link } from '@nextui-org/react';

export default function Articles() {
  return (
    <div className="articles-main">
      <h2 id="articles-header">Latest News</h2>
      <div className="articles">
        {data.articles.map(article => (
          <div className="article" key={article.title}>
            <Card css={{ w: '100%' }}>
              <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                <Col>
                  <Text
                    size={12}
                    weight="bold"
                    transform="uppercase"
                    color="#9E9E9E"
                  >
                    {article.author}
                  </Text>
                  <Text h4 color="black">
                    {article.title}
                  </Text>
                </Col>
              </Card.Header>
              <Link href={article.url}>
                <Card.Image
                  src={article.pic}
                  width="400px"
                  height={340}
                  objectFit="scale-down"
                  alt="Card image background"
                />
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
