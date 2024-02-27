import { useState } from 'react'
import {
  Card,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spacer,
  useDisclosure,
} from '@nextui-org/react'
import { articles } from '@assets/article_data'

export function Articles() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [article, setArticle] = useState({
    id: 0,
    title: '',
    pic: '',
    date: '',
    content: '',
  })

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {articles.map((article) => (
        <div key={article.id}>
          <Card
            onPress={() => {
              setArticle(article)
              onOpen()
            }}
            isFooterBlurred
            className="border-none"
            isPressable>
            <Image
              src={article.pic}
              alt="Card background"
              className="object-cover"
              isZoomed
              height={250}
              width={400}
            />
            <CardFooter className="border-1 rounded-large shadow-small absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden border-white/20 py-1 before:rounded-xl before:bg-white/10">
              <p className="line-clamp-2 text-balance text-lg">
                {article.title}
              </p>
            </CardFooter>
          </Card>
        </div>
      ))}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeButton
        backdrop="blur"
        size="3xl"
        aria-labelledby="news">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p>{article.title}</p>
              </ModalHeader>
              <Spacer y={1} />
              <hr />
              <ModalBody>
                <em>{article.date}</em>
                <p>{article.content}</p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
