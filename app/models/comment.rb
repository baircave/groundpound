class Comment < ApplicationRecord

  validates :body, :author_id, :track_id, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: 'User'

  belongs_to :parent_comment,
    foreign_key: :parent_comment_id,
    class_name: 'Comment',
    optional: true

  belongs_to :track

end
