Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :likes, only: [:destroy]
    resources :follows, only: [:destroy]
    resources :reposts, only: [:destroy]
    resources :songs, only: [:index, :create, :show, :update]
    resources :users, only: [:index, :create, :show, :update] do
      # resources :likes, only: [:create]
      # resources :follows, only: [:create]
      resources :reposts, only: [:create]
    end
    resource :session, only: [:create, :destroy]

    post 'users/likes/:song_id', to: 'users#like'
    delete 'users/likes/:song_id', to: 'users#unlike'

    post 'users/follows/:followee_id', to: 'users#follow'
    delete 'users/follows/:followee_id', to: 'users#unfollow'
  end

end
