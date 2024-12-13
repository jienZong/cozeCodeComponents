import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownProps {
    content: string;
  }

export function Markdown(props:MarkdownProps){
    return (
        // <ReactMarkdown>{props.content}</ReactMarkdown>
        <ReactMarkdown className="markdown-external-container"
            components={{
                h1: ({ node, ...props }) => <p {...props} />, // 将 h1 替换为 span
                code({ className, children }) {
                const match = /language-(\w+)/.exec(
                    className || ""
                );
                return match ? (
                    <SyntaxHighlighter
                    showLineNumbers={true}
                    language={match[1]}
                    PreTag="div"
                    style={
                        vscDarkPlus
                      }
                    >
                    {String(children).replace(
                        /\n$/,
                        ""
                    )}
                    </SyntaxHighlighter>
                ) : (
                    <code className={className}>
                    {children}
                    </code>
                );
                },
            }}
            >
            {props.content}
        </ReactMarkdown>

    )
}