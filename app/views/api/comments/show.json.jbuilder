json.comments do
  json.set! @comment.id do
    json.extract! @comment, :id, :body, :author_id, :parent_comment_id, :track_id, :created_at
  end
end

json.users do
  json.set! @author.id do
    json.extract! @author, :id, :username
  end
end
