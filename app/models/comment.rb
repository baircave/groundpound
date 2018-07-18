class Comment < ApplicationRecord

  validates :body, :author_id, :track_id, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: 'User',
    dependent: :destroy

  belongs_to :parent_comment,
    foreign_key: :parent_comment_id,
    class_name: 'Comment',
    optional: true,
    dependent: :destroy

  belongs_to :track,
    dependent: :destroy

end
