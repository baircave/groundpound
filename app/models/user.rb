class User < ApplicationRecord

  after_initialize :ensure_session_token

  validates :username, :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 8 }, allow_nil: true

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user if user && user.is_password?(password)
    nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end


  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end