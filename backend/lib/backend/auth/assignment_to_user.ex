defmodule Backend.Auth.AssignmentToUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.AssignmentToUser


  @primary_key {:id, :binary_id, autogenerate: true}
  schema "assignments_to_users" do
    field(:assignment_id, :binary_id, null: false)
    field(:user_id, :binary_id, null: false)
  end

  @doc false
  def changeset(%AssignmentToUser{} = assignment_to_user, attrs) do
    assignment_to_user
    |> cast(attrs, [:id, :assignment_id, :user_id])
    |> validate_required([:id, :assignment_id, :user_id])
  end
end
