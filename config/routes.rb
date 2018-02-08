Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :songs, only: [:index, :create, :show, :update]
    resources :users, only: [:index, :create, :show, :update]
    resource :session, only: [:create, :destroy]

    post 'users/likes/:song_id', to: 'users#like'
    delete 'users/likes/:song_id', to: 'users#unlike'

    post 'users/reposts/:song_id', to: 'users#repost'
    delete 'users/reposts/:song_id', to: 'users#unrepost'

    post 'users/follows/:followee_id', to: 'users#follow'
    delete 'users/follows/:followee_id', to: 'users#unfollow'
  end

end
