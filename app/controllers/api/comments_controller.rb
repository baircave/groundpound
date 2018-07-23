class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    @comment.track_id = params[:track_id]
    @comment.author_id = current_user.id
    if @comment.save
      @author = @comment.author
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: { commentId: comment.id }
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :parent_comment_id) #parentcommentid might need to come from path
  end

end
