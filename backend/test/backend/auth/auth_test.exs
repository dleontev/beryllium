defmodule Backend.AuthTest do
  use Backend.DataCase

  alias Backend.Auth

  describe "users" do
    alias Backend.Auth.User

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Auth.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Auth.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Auth.create_user(@valid_attrs)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Auth.update_user(user, @update_attrs)
      assert %User{} = user
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_user(user, @invalid_attrs)
      assert user == Auth.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Auth.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Auth.change_user(user)
    end
  end

  describe "courses" do
    alias Backend.Auth.Course

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def course_fixture(attrs \\ %{}) do
      {:ok, course} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_course()

      course
    end

    test "list_courses/0 returns all courses" do
      course = course_fixture()
      assert Auth.list_courses() == [course]
    end

    test "get_course!/1 returns the course with given id" do
      course = course_fixture()
      assert Auth.get_course!(course.id) == course
    end

    test "create_course/1 with valid data creates a course" do
      assert {:ok, %Course{} = course} = Auth.create_course(@valid_attrs)
    end

    test "create_course/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_course(@invalid_attrs)
    end

    test "update_course/2 with valid data updates the course" do
      course = course_fixture()
      assert {:ok, course} = Auth.update_course(course, @update_attrs)
      assert %Course{} = course
    end

    test "update_course/2 with invalid data returns error changeset" do
      course = course_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_course(course, @invalid_attrs)
      assert course == Auth.get_course!(course.id)
    end

    test "delete_course/1 deletes the course" do
      course = course_fixture()
      assert {:ok, %Course{}} = Auth.delete_course(course)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_course!(course.id) end
    end

    test "change_course/1 returns a course changeset" do
      course = course_fixture()
      assert %Ecto.Changeset{} = Auth.change_course(course)
    end
  end

  describe "enrollments" do
    alias Backend.Auth.Enrollment

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def enrollment_fixture(attrs \\ %{}) do
      {:ok, enrollment} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_enrollment()

      enrollment
    end

    test "list_enrollments/0 returns all enrollments" do
      enrollment = enrollment_fixture()
      assert Auth.list_enrollments() == [enrollment]
    end

    test "get_enrollment!/1 returns the enrollment with given id" do
      enrollment = enrollment_fixture()
      assert Auth.get_enrollment!(enrollment.id) == enrollment
    end

    test "create_enrollment/1 with valid data creates a enrollment" do
      assert {:ok, %Enrollment{} = enrollment} = Auth.create_enrollment(@valid_attrs)
    end

    test "create_enrollment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_enrollment(@invalid_attrs)
    end

    test "update_enrollment/2 with valid data updates the enrollment" do
      enrollment = enrollment_fixture()
      assert {:ok, enrollment} = Auth.update_enrollment(enrollment, @update_attrs)
      assert %Enrollment{} = enrollment
    end

    test "update_enrollment/2 with invalid data returns error changeset" do
      enrollment = enrollment_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_enrollment(enrollment, @invalid_attrs)
      assert enrollment == Auth.get_enrollment!(enrollment.id)
    end

    test "delete_enrollment/1 deletes the enrollment" do
      enrollment = enrollment_fixture()
      assert {:ok, %Enrollment{}} = Auth.delete_enrollment(enrollment)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_enrollment!(enrollment.id) end
    end

    test "change_enrollment/1 returns a enrollment changeset" do
      enrollment = enrollment_fixture()
      assert %Ecto.Changeset{} = Auth.change_enrollment(enrollment)
    end
  end

  describe "groups" do
    alias Backend.Auth.Group

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def group_fixture(attrs \\ %{}) do
      {:ok, group} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_group()

      group
    end

    test "list_groups/0 returns all groups" do
      group = group_fixture()
      assert Auth.list_groups() == [group]
    end

    test "get_group!/1 returns the group with given id" do
      group = group_fixture()
      assert Auth.get_group!(group.id) == group
    end

    test "create_group/1 with valid data creates a group" do
      assert {:ok, %Group{} = group} = Auth.create_group(@valid_attrs)
    end

    test "create_group/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_group(@invalid_attrs)
    end

    test "update_group/2 with valid data updates the group" do
      group = group_fixture()
      assert {:ok, group} = Auth.update_group(group, @update_attrs)
      assert %Group{} = group
    end

    test "update_group/2 with invalid data returns error changeset" do
      group = group_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_group(group, @invalid_attrs)
      assert group == Auth.get_group!(group.id)
    end

    test "delete_group/1 deletes the group" do
      group = group_fixture()
      assert {:ok, %Group{}} = Auth.delete_group(group)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_group!(group.id) end
    end

    test "change_group/1 returns a group changeset" do
      group = group_fixture()
      assert %Ecto.Changeset{} = Auth.change_group(group)
    end
  end

  describe "groupsets" do
    alias Backend.Auth.Groupset

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def groupset_fixture(attrs \\ %{}) do
      {:ok, groupset} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_groupset()

      groupset
    end

    test "list_groupsets/0 returns all groupsets" do
      groupset = groupset_fixture()
      assert Auth.list_groupsets() == [groupset]
    end

    test "get_groupset!/1 returns the groupset with given id" do
      groupset = groupset_fixture()
      assert Auth.get_groupset!(groupset.id) == groupset
    end

    test "create_groupset/1 with valid data creates a groupset" do
      assert {:ok, %Groupset{} = groupset} = Auth.create_groupset(@valid_attrs)
    end

    test "create_groupset/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_groupset(@invalid_attrs)
    end

    test "update_groupset/2 with valid data updates the groupset" do
      groupset = groupset_fixture()
      assert {:ok, groupset} = Auth.update_groupset(groupset, @update_attrs)
      assert %Groupset{} = groupset
    end

    test "update_groupset/2 with invalid data returns error changeset" do
      groupset = groupset_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_groupset(groupset, @invalid_attrs)
      assert groupset == Auth.get_groupset!(groupset.id)
    end

    test "delete_groupset/1 deletes the groupset" do
      groupset = groupset_fixture()
      assert {:ok, %Groupset{}} = Auth.delete_groupset(groupset)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_groupset!(groupset.id) end
    end

    test "change_groupset/1 returns a groupset changeset" do
      groupset = groupset_fixture()
      assert %Ecto.Changeset{} = Auth.change_groupset(groupset)
    end
  end

  describe "roles" do
    alias Backend.Auth.Role

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def role_fixture(attrs \\ %{}) do
      {:ok, role} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_role()

      role
    end

    test "list_roles/0 returns all roles" do
      role = role_fixture()
      assert Auth.list_roles() == [role]
    end

    test "get_role!/1 returns the role with given id" do
      role = role_fixture()
      assert Auth.get_role!(role.id) == role
    end

    test "create_role/1 with valid data creates a role" do
      assert {:ok, %Role{} = role} = Auth.create_role(@valid_attrs)
    end

    test "create_role/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_role(@invalid_attrs)
    end

    test "update_role/2 with valid data updates the role" do
      role = role_fixture()
      assert {:ok, role} = Auth.update_role(role, @update_attrs)
      assert %Role{} = role
    end

    test "update_role/2 with invalid data returns error changeset" do
      role = role_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_role(role, @invalid_attrs)
      assert role == Auth.get_role!(role.id)
    end

    test "delete_role/1 deletes the role" do
      role = role_fixture()
      assert {:ok, %Role{}} = Auth.delete_role(role)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_role!(role.id) end
    end

    test "change_role/1 returns a role changeset" do
      role = role_fixture()
      assert %Ecto.Changeset{} = Auth.change_role(role)
    end
  end

  describe "schools" do
    alias Backend.Auth.School

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def school_fixture(attrs \\ %{}) do
      {:ok, school} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_school()

      school
    end

    test "list_schools/0 returns all schools" do
      school = school_fixture()
      assert Auth.list_schools() == [school]
    end

    test "get_school!/1 returns the school with given id" do
      school = school_fixture()
      assert Auth.get_school!(school.id) == school
    end

    test "create_school/1 with valid data creates a school" do
      assert {:ok, %School{} = school} = Auth.create_school(@valid_attrs)
    end

    test "create_school/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_school(@invalid_attrs)
    end

    test "update_school/2 with valid data updates the school" do
      school = school_fixture()
      assert {:ok, school} = Auth.update_school(school, @update_attrs)
      assert %School{} = school
    end

    test "update_school/2 with invalid data returns error changeset" do
      school = school_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_school(school, @invalid_attrs)
      assert school == Auth.get_school!(school.id)
    end

    test "delete_school/1 deletes the school" do
      school = school_fixture()
      assert {:ok, %School{}} = Auth.delete_school(school)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_school!(school.id) end
    end

    test "change_school/1 returns a school changeset" do
      school = school_fixture()
      assert %Ecto.Changeset{} = Auth.change_school(school)
    end
  end

  describe "sections" do
    alias Backend.Auth.Section

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def section_fixture(attrs \\ %{}) do
      {:ok, section} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_section()

      section
    end

    test "list_sections/0 returns all sections" do
      section = section_fixture()
      assert Auth.list_sections() == [section]
    end

    test "get_section!/1 returns the section with given id" do
      section = section_fixture()
      assert Auth.get_section!(section.id) == section
    end

    test "create_section/1 with valid data creates a section" do
      assert {:ok, %Section{} = section} = Auth.create_section(@valid_attrs)
    end

    test "create_section/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_section(@invalid_attrs)
    end

    test "update_section/2 with valid data updates the section" do
      section = section_fixture()
      assert {:ok, section} = Auth.update_section(section, @update_attrs)
      assert %Section{} = section
    end

    test "update_section/2 with invalid data returns error changeset" do
      section = section_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_section(section, @invalid_attrs)
      assert section == Auth.get_section!(section.id)
    end

    test "delete_section/1 deletes the section" do
      section = section_fixture()
      assert {:ok, %Section{}} = Auth.delete_section(section)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_section!(section.id) end
    end

    test "change_section/1 returns a section changeset" do
      section = section_fixture()
      assert %Ecto.Changeset{} = Auth.change_section(section)
    end
  end
end
