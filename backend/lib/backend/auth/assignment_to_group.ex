defmodule Backend.Auth.AssignmentToGroup do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.AssignmentToGroup


  @primary_key {:id, :binary_id, autogenerate: true}
  schema "assignments_to_groups" do
    field(:assignment_id, :binary_id, null: false)
    field(:group_id, :binary_id, null: false)
  end

  @doc false
  def changeset(%AssignmentToGroup{} = assignment_to_group, attrs) do
    assignment_to_group
    |> cast(attrs, [:id, :assignment_id, :group_id])
    |> validate_required([:id, :assignment_id, :group_id])
  end
end
