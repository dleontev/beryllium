defmodule Backend.GuardianSerializer do
  @behaviour Guardian.Serializer
  
  alias Backend.Repo
  alias Backend.Auth.User
  
  def for_token(users = %User{}), do: {:ok, "User:#{users.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}
  
  def from_token("User:" <> id), do: {:ok, Repo.get(User, id)}
  def from_token(_), do: {:error, "Unknown resource type"}
end