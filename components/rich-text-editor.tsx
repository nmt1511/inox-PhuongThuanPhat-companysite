"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Loader2,
} from "lucide-react"
import { CloudinaryUploader } from "@/lib/cloudinary"
import { useToast } from "@/hooks/use-toast"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Viết nội dung...",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { toast } = useToast()

  const execCommand = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value)
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML)
      }
    },
    [onChange],
  )

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const response = await CloudinaryUploader.uploadImage(file, "news-content")
      const imageUrl = response.secure_url

      // Insert image into editor
      const img = `<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto; margin: 10px 0;" />`
      execCommand("insertHTML", img)

      toast({
        title: "Thành công",
        description: "Đã thêm ảnh vào nội dung",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Lỗi",
        description: "Không thể tải ảnh lên",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const insertLink = () => {
    const url = prompt("Nhập URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    execCommand("insertText", text)
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("bold")} className="h-8 w-8 p-0">
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("italic")} className="h-8 w-8 p-0">
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("underline")}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("formatBlock", "h1")}
            className="h-8 w-8 p-0"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("formatBlock", "h2")}
            className="h-8 w-8 p-0"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("formatBlock", "h3")}
            className="h-8 w-8 p-0"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("insertUnorderedList")}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("insertOrderedList")}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyLeft")}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyCenter")}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyRight")}
            className="h-8 w-8 p-0"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Other Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("formatBlock", "blockquote")}
            className="h-8 w-8 p-0"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand("formatBlock", "pre")}
            className="h-8 w-8 p-0"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Media */}
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={insertLink} className="h-8 w-8 p-0">
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            className="h-8 w-8 p-0"
          >
            {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none"
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
        data-placeholder={placeholder}
      />

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        
        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        
        [contenteditable] h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        
        [contenteditable] blockquote {
          margin: 1em 0;
          padding-left: 1em;
          border-left: 4px solid #e5e7eb;
          color: #6b7280;
        }
        
        [contenteditable] pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.375rem;
          overflow-x: auto;
          font-family: monospace;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  )
}
