"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ThumbsUp, MessageCircle, Send, CornerDownRight } from 'lucide-react'

type Comment = {
  id: number
  user: string
  content: string
  likes: number
  replies: Comment[]
}

type Post = {
  id: number
  user: string
  content: string
  likes: number
  comments: Comment[]
  image?: string
}

const initialPosts: Post[] = [
  {
    id: 1,
    user: 'John Doe',
    content: 'Just finished planting my cover crops. Excited to see how they improve soil health!',
    likes: 5,
    comments: [
      {
        id: 1,
        user: 'Jane Smith',
        content: 'That\'s great! Which cover crops did you choose?',
        likes: 2,
        replies: [
          {
            id: 1,
            user: 'John Doe',
            content: 'I went with a mix of clover and rye. They work well in our climate.',
            likes: 1,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    user: 'Admin',
    content: 'Reminder: We have a webinar on regenerative grazing techniques next week. Don\'t forget to register!',
    likes: 10,
    comments: []
  }
]

export function FarmFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [replyingTo, setReplyingTo] = useState<{ postId: number, commentId: number } | null>(null)

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim() || imageFile) {
      const post: Post = {
        id: posts.length + 1,
        user: 'You',
        content: newPost.trim(),
        likes: 0,
        comments: [],
        image: imageFile ? URL.createObjectURL(imageFile) : undefined
      }
      setPosts([post, ...posts])
      setNewPost('')
      setImageFile(null)
    }
  }

  const handleLike = (postId: number, commentId?: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (commentId) {
          return {
            ...post,
            comments: post.comments.map(comment => 
              comment.id === commentId ? { ...comment, likes: comment.likes === 0 ? 1 : 0 } : comment
            )
          }
        } else {
          return { ...post, likes: post.likes === 0 ? 1 : 0 }
        }
      }
      return post
    }))
  }

  const handleComment = (postId: number, content: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { 
        ...post, 
        comments: [...post.comments, {
          id: post.comments.length + 1,
          user: 'You',
          content,
          likes: 0,
          replies: []
        }]
      } : post
    ))
  }

  const handleReply = (postId: number, commentId: number, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...comment.replies, {
                  id: comment.replies.length + 1,
                  user: 'You',
                  content,
                  likes: 0,
                  replies: []
                }]
              }
            }
            return comment
          })
        }
      }
      return post
    }))
    setReplyingTo(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const renderComments = (comments: Comment[], postId: number) => {
    return comments.map((comment) => (
      <div key={comment.id} className="mb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={`/avatar-${comment.user.toLowerCase().replace(' ', '-')}.png`} />
            <AvatarFallback>{comment.user[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">{comment.user}</span>
        </div>
        <p className="ml-8 text-sm">{comment.content}</p>
        <div className="ml-8 flex items-center space-x-2 text-sm text-gray-500">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleLike(postId, comment.id)}
            className={comment.likes > 0 ? "text-blue-500" : ""}
          >
            <ThumbsUp className="mr-1 h-3 w-3" />
            {comment.likes}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setReplyingTo({ postId, commentId: comment.id })}
          >
            Reply
          </Button>
        </div>
        {replyingTo && replyingTo.postId === postId && replyingTo.commentId === comment.id && (
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              const input = e.currentTarget.elements.namedItem('reply') as HTMLInputElement
              handleReply(postId, comment.id, input.value)
              input.value = ''
            }} 
            className="flex w-full space-x-2 mt-2 ml-8"
          >
            <Input name="reply" placeholder="Write a reply..." className="flex-grow" />
            <Button type="submit" size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        )}
        {comment.replies.length > 0 && (
          <div className="ml-8 mt-2">
            {renderComments(comment.replies, postId)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <Textarea
              placeholder="Share your farming experience..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-2/3"
              />
              <Button type="submit">Post</Button>
            </div>
          </form>
        </CardHeader>
      </Card>
      <ScrollArea className="h-[600px]">
        {posts.map((post) => (
          <Card key={post.id} className="mb-4">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar>
                <AvatarImage src={`/avatar-${post.user.toLowerCase().replace(' ', '-')}.png`} />
                <AvatarFallback>{post.user[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.user}</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post image" className="mt-4 rounded-lg max-h-64 w-auto" />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleLike(post.id)}
                className={post.likes > 0 ? "text-blue-500" : ""}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                {post.comments.length}
              </Button>
            </CardFooter>
            {post.comments.length > 0 && (
              <CardContent>
                <ScrollArea className="h-40">
                  {renderComments(post.comments, post.id)}
                </ScrollArea>
              </CardContent>
            )}
            <CardFooter>
              <form onSubmit={(e) => {
                e.preventDefault()
                const input = e.currentTarget.elements.namedItem('comment') as HTMLInputElement
                handleComment(post.id, input.value)
                input.value = ''
              }} className="flex w-full space-x-2">
                <Input name="comment" placeholder="Write a comment..." className="flex-grow" />
                <Button type="submit" size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}

