class User < ApplicationRecord
  has_many :transactions, foreign_key: :to

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable,
         :omniauthable
  include DeviseTokenAuth::Concerns::User

  after_create :set_default_amount

  def set_default_amount
    self.transactions.create!({to: self, amount: 100})
  end

  def balance
    self.transactions.sum { |t| t.amount } || 0
  end
end
