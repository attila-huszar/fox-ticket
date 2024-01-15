import { useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spacer,
  Divider,
  useDisclosure,
} from '@nextui-org/react'
import '../styles/Articles.css'
import data from '../assets/article_data'

export default function Articles() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [displayedArticleId, setDisplayedArticleId] = useState(0)

  const articleTitle = data.articles[displayedArticleId].title
  const articleDate = data.articles[displayedArticleId].date
  const articleText = data.articles[displayedArticleId].content

  return (
    <>
      <div className="gap-1">
        <div className="articles">
          {data.articles.map((article) => (
            <div key={article.id}>
              <Card
                onPress={() => {
                  onOpen
                  setDisplayedArticleId(article.id)
                }}
                style={{ width: '300px', height: '300px' }}
                isHoverable
                isPressable>
                <CardFooter
                  style={{
                    position: 'absolute',
                    borderTop: '$borderWeights$light solid $gray800',
                    bottom: 0,
                    zIndex: 1,
                  }}>
                  <p
                    color="white"
                    style={{
                      fontSize: '16px',
                      display: '-webkit-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                    }}>
                    {article.title}
                  </p>
                </CardFooter>
                <Divider />
                <CardBody>
                  <Image src={article.pic} alt="Card background" />
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-[800px]"
        aria-labelledby="news">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p className="text-base">{articleTitle}</p>
              </ModalHeader>
              <Spacer y={1} />
              <hr
                style={{
                  color: '#f2f2f2',
                  height: 5,
                }}
              />
              <ModalBody>
                <p>
                  <em>{articleDate}</em>
                </p>
                <p style={{ whiteSpace: 'pre-line' }}>{articleText}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
