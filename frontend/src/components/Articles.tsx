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
import data from '@assets/article_data'

export function Articles() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [displayedArticleId, setDisplayedArticleId] = useState(0)

  const articleTitle = data.articles[displayedArticleId].title
  const articleDate = data.articles[displayedArticleId].date
  const articleText = data.articles[displayedArticleId].content

  return (
    <>
      <div>
        {data.articles.map((article) => (
          <div key={article.id}>
            <Card
              onPress={() => {
                onOpen
                setDisplayedArticleId(article.id)
              }}
              isHoverable
              isPressable>
              <CardFooter>
                <p>{article.title}</p>
              </CardFooter>
              <Divider />
              <CardBody>
                <Image src={article.pic} alt="Card background" />
              </CardBody>
            </Card>
          </div>
        ))}
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
              <hr />
              <ModalBody>
                <p>
                  <em>{articleDate}</em>
                </p>
                <p>{articleText}</p>
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
