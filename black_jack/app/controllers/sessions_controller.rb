class SessionsController < ApplicationController
  def create
    @user = User.find_by( username: params[ :session ][ :username ] )
    if @user && @user.authenticate( params[ :session ] [ :password ] )
      session[ :user_id ] = @user.id
      redirect_to user_path( @user.id )
    else
      flash[ :error ] = "Invalid credentials"
      redirect_to root_path
    end
  end

  def destroy
    session.clear
    redirect_to root_path
  end
end
