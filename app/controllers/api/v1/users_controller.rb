class Api::V1::UsersController < ApplicationController
  def index
    users = User.where.not(email: 'admin@brian.biz')
    json_response(users)
  end

  # not needed
  def show
    user = User.find(params[:id])
    json_response(user)
  end

  def current
    return render json: {email: current_user.email,  balance: current_user.balance} if user_signed_in?

    head :no_content
  end

  def make_payment
    if user_signed_in?
      user = User.find(params[:user_id])
      amount = params[:amount]

      transaction = current_user.transactions.build({amount: amount})
      transaction.to = user

      # checks for a negative blaance ... if there is one it'll
      # throw an error
      unless current_user.valid?
        return json_response(current_user, :unprocessable_entity)
      end

      transaction.save!
    end

    head :no_content
  end
end
