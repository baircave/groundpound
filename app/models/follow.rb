class Follow < ApplicationRecord

  validates :artist_id, :user_id, presence: true

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: 'User'

  belongs_to :user

end
