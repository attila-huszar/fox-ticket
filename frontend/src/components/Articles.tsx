import { useState } from 'react';
import {
  Card,
  Text,
  Grid,
  useModal,
  Modal,
  Button,
  Spacer,
} from '@nextui-org/react';
import '../styles/Articles.css';
import data from '../assets/article_data';

export default function Articles({ isAdmin }: any) {
  const { setVisible, bindings } = useModal();
  const [displayedArticleId, setDisplayedArticleId] = useState(0);

  const articleTitle = data.articles[displayedArticleId].title;
  const articleDate = data.articles[displayedArticleId].date;
  const articleText = data.articles[displayedArticleId].content;

  return (
    <>
      <h2 style={{ padding: '20px 0 0 40px' }}>News</h2>
      <Grid.Container gap={3}>
        <div className="articles">
          {data.articles.map(article => (
            <Grid>
              <Card
                key={article.id}
                onPress={() => {
                  setVisible(true);
                  setDisplayedArticleId(article.id);
                }}
                style={{ width: '300px', height: '300px' }}
                isHoverable
                isPressable
              >
                <Card.Footer
                  isBlurred
                  css={{
                    position: 'absolute',
                    bgBlur: '#0f111466',
                    borderTop: '$borderWeights$light solid $gray800',
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Text color="white" size={16}>
                    {article.title}
                  </Text>
                </Card.Footer>
                <Card.Divider />
                <Card.Image src={article.pic} alt="Card background" />
              </Card>
            </Grid>
          ))}
        </div>
      </Grid.Container>

      <Modal scroll width="800px" aria-labelledby="news" {...bindings}>
        <Spacer y={1} />
        <Modal.Header>
          <Text size={20}>{articleTitle}</Text>
        </Modal.Header>
        <Spacer y={1} />
        <hr
          style={{
            color: '#f2f2f2',
            height: 5,
          }}
        />
        <Modal.Body>
          <Text>
            <em>{articleDate}</em>
          </Text>
          <Text style={{ whiteSpace: 'pre-line' }}>{articleText}</Text>
        </Modal.Body>
        <Modal.Footer>
          {isAdmin ? (
            <>
              <Button shadow size="md" auto color="gradient" id="submit">
                Remove
              </Button>
              <Spacer />
              <Button shadow size="md" auto color="gradient" id="submit">
                Edit
              </Button>
            </>
          ) : (
            <Button auto flat color="primary" onPress={() => setVisible(false)}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
