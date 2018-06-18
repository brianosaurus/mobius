class Api::V1::UsersController < ApplicationController

  def index
    users = User.all
    json_response(users)
  end

  def show
    user = User.find(params[:id])
    json_response(user)
  end

  def balance
      return render json: {email: current_user.email,  total: current_user.balance} if user_signed_in?

      head :no_content
  end

  def send
    if user_signed_in?
      user = User.find(params[:id])
      amount = params[:amount]

      Transaction.create!({from: current_user, to: user, amount: amount)
    end

    head :no_content
  end
end
