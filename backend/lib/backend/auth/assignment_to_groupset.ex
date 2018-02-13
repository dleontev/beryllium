defmodule Backend.Auth.Assignment_to_groupset do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Assignment_to_groupset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "assignments_to_groupsets" do
    field(:assignment_id, :binary_id, null: false)
    field(:groupset_id, :binary_id, null: false)
  end

  @doc false
  def changeset(%Assignment_to_groupset{} = assignment_to_groupset, attrs) do
    assignment_to_groupset
    |> cast(attrs, [:id, :assignment_id, :groupset_id])
    |> validate_required([:id, :assignment_id, :groupset_id])
  end
end
