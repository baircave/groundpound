Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, default: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :update, :show, :destroy]
    resources :tracks do
      resources :comments, only: [:create, :destroy]
    end
    resource :reposts, only: [:create, :destroy]
    resource :likes, only: [:create, :destroy]
    resource :follows, only: [:create, :destroy]
  end

end
