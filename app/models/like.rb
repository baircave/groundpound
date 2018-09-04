class Like < ApplicationRecord

  validates :track_id, :user_id, presence: true
  validates :track_id, uniqueness: { scope: :user_id }

  belongs_to :user

  belongs_to :track

end
