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

  describe "courselists" do
    alias Backend.Auth.CourseList

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def course_list_fixture(attrs \\ %{}) do
      {:ok, course_list} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_course_list()

      course_list
    end

    test "list_courselists/0 returns all courselists" do
      course_list = course_list_fixture()
      assert Auth.list_courselists() == [course_list]
    end

    test "get_course_list!/1 returns the course_list with given id" do
      course_list = course_list_fixture()
      assert Auth.get_course_list!(course_list.id) == course_list
    end

    test "create_course_list/1 with valid data creates a course_list" do
      assert {:ok, %CourseList{} = course_list} = Auth.create_course_list(@valid_attrs)
    end

    test "create_course_list/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_course_list(@invalid_attrs)
    end

    test "update_course_list/2 with valid data updates the course_list" do
      course_list = course_list_fixture()
      assert {:ok, course_list} = Auth.update_course_list(course_list, @update_attrs)
      assert %CourseList{} = course_list
    end

    test "update_course_list/2 with invalid data returns error changeset" do
      course_list = course_list_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_course_list(course_list, @invalid_attrs)
      assert course_list == Auth.get_course_list!(course_list.id)
    end

    test "delete_course_list/1 deletes the course_list" do
      course_list = course_list_fixture()
      assert {:ok, %CourseList{}} = Auth.delete_course_list(course_list)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_course_list!(course_list.id) end
    end

    test "change_course_list/1 returns a course_list changeset" do
      course_list = course_list_fixture()
      assert %Ecto.Changeset{} = Auth.change_course_list(course_list)
    end
  end

  describe "course_list_view" do
    alias Backend.Auth.CourseList

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def course_list_fixture(attrs \\ %{}) do
      {:ok, course_list} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_course_list()

      course_list
    end

    test "list_course_list_view/0 returns all course_list_view" do
      course_list = course_list_fixture()
      assert Auth.list_course_list_view() == [course_list]
    end

    test "get_course_list!/1 returns the course_list with given id" do
      course_list = course_list_fixture()
      assert Auth.get_course_list!(course_list.id) == course_list
    end

    test "create_course_list/1 with valid data creates a course_list" do
      assert {:ok, %CourseList{} = course_list} = Auth.create_course_list(@valid_attrs)
    end

    test "create_course_list/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_course_list(@invalid_attrs)
    end

    test "update_course_list/2 with valid data updates the course_list" do
      course_list = course_list_fixture()
      assert {:ok, course_list} = Auth.update_course_list(course_list, @update_attrs)
      assert %CourseList{} = course_list
    end

    test "update_course_list/2 with invalid data returns error changeset" do
      course_list = course_list_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_course_list(course_list, @invalid_attrs)
      assert course_list == Auth.get_course_list!(course_list.id)
    end

    test "delete_course_list/1 deletes the course_list" do
      course_list = course_list_fixture()
      assert {:ok, %CourseList{}} = Auth.delete_course_list(course_list)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_course_list!(course_list.id) end
    end

    test "change_course_list/1 returns a course_list changeset" do
      course_list = course_list_fixture()
      assert %Ecto.Changeset{} = Auth.change_course_list(course_list)
    end
  end

  describe "announcements" do
    alias Backend.Auth.Announcement

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def announcement_fixture(attrs \\ %{}) do
      {:ok, announcement} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_announcement()

      announcement
    end

    test "list_announcements/0 returns all announcements" do
      announcement = announcement_fixture()
      assert Auth.list_announcements() == [announcement]
    end

    test "get_announcement!/1 returns the announcement with given id" do
      announcement = announcement_fixture()
      assert Auth.get_announcement!(announcement.id) == announcement
    end

    test "create_announcement/1 with valid data creates a announcement" do
      assert {:ok, %Announcement{} = announcement} = Auth.create_announcement(@valid_attrs)
    end

    test "create_announcement/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_announcement(@invalid_attrs)
    end

    test "update_announcement/2 with valid data updates the announcement" do
      announcement = announcement_fixture()
      assert {:ok, announcement} = Auth.update_announcement(announcement, @update_attrs)
      assert %Announcement{} = announcement
    end

    test "update_announcement/2 with invalid data returns error changeset" do
      announcement = announcement_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_announcement(announcement, @invalid_attrs)
      assert announcement == Auth.get_announcement!(announcement.id)
    end

    test "delete_announcement/1 deletes the announcement" do
      announcement = announcement_fixture()
      assert {:ok, %Announcement{}} = Auth.delete_announcement(announcement)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_announcement!(announcement.id) end
    end

    test "change_announcement/1 returns a announcement changeset" do
      announcement = announcement_fixture()
      assert %Ecto.Changeset{} = Auth.change_announcement(announcement)
    end
  end

  describe "posts" do
    alias Backend.Auth.Post

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def post_fixture(attrs \\ %{}) do
      {:ok, post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_post()

      post
    end

    test "list_posts/0 returns all posts" do
      post = post_fixture()
      assert Auth.list_posts() == [post]
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Auth.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      assert {:ok, %Post{} = post} = Auth.create_post(@valid_attrs)
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      assert {:ok, post} = Auth.update_post(post, @update_attrs)
      assert %Post{} = post
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_post(post, @invalid_attrs)
      assert post == Auth.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Auth.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Auth.change_post(post)
    end
  end

  describe "membership" do
    alias Backend.Auth.Memberships

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def memberships_fixture(attrs \\ %{}) do
      {:ok, memberships} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_memberships()

      memberships
    end

    test "list_membership/0 returns all membership" do
      memberships = memberships_fixture()
      assert Auth.list_membership() == [memberships]
    end

    test "get_memberships!/1 returns the memberships with given id" do
      memberships = memberships_fixture()
      assert Auth.get_memberships!(memberships.id) == memberships
    end

    test "create_memberships/1 with valid data creates a memberships" do
      assert {:ok, %Memberships{} = memberships} = Auth.create_memberships(@valid_attrs)
    end

    test "create_memberships/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_memberships(@invalid_attrs)
    end

    test "update_memberships/2 with valid data updates the memberships" do
      memberships = memberships_fixture()
      assert {:ok, memberships} = Auth.update_memberships(memberships, @update_attrs)
      assert %Memberships{} = memberships
    end

    test "update_memberships/2 with invalid data returns error changeset" do
      memberships = memberships_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_memberships(memberships, @invalid_attrs)
      assert memberships == Auth.get_memberships!(memberships.id)
    end

    test "delete_memberships/1 deletes the memberships" do
      memberships = memberships_fixture()
      assert {:ok, %Memberships{}} = Auth.delete_memberships(memberships)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_memberships!(memberships.id) end
    end

    test "change_memberships/1 returns a memberships changeset" do
      memberships = memberships_fixture()
      assert %Ecto.Changeset{} = Auth.change_memberships(memberships)
    end
  end

  describe "discussions" do
    alias Backend.Auth.Discussion

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def discussion_fixture(attrs \\ %{}) do
      {:ok, discussion} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_discussion()

      discussion
    end

    test "list_discussions/0 returns all discussions" do
      discussion = discussion_fixture()
      assert Auth.list_discussions() == [discussion]
    end

    test "get_discussion!/1 returns the discussion with given id" do
      discussion = discussion_fixture()
      assert Auth.get_discussion!(discussion.id) == discussion
    end

    test "create_discussion/1 with valid data creates a discussion" do
      assert {:ok, %Discussion{} = discussion} = Auth.create_discussion(@valid_attrs)
    end

    test "create_discussion/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_discussion(@invalid_attrs)
    end

    test "update_discussion/2 with valid data updates the discussion" do
      discussion = discussion_fixture()
      assert {:ok, discussion} = Auth.update_discussion(discussion, @update_attrs)
      assert %Discussion{} = discussion
    end

    test "update_discussion/2 with invalid data returns error changeset" do
      discussion = discussion_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_discussion(discussion, @invalid_attrs)
      assert discussion == Auth.get_discussion!(discussion.id)
    end

    test "delete_discussion/1 deletes the discussion" do
      discussion = discussion_fixture()
      assert {:ok, %Discussion{}} = Auth.delete_discussion(discussion)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_discussion!(discussion.id) end
    end

    test "change_discussion/1 returns a discussion changeset" do
      discussion = discussion_fixture()
      assert %Ecto.Changeset{} = Auth.change_discussion(discussion)
    end
  end

  describe "memberships" do
    alias Backend.Auth.Membership

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def membership_fixture(attrs \\ %{}) do
      {:ok, membership} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_membership()

      membership
    end

    test "list_memberships/0 returns all memberships" do
      membership = membership_fixture()
      assert Auth.list_memberships() == [membership]
    end

    test "get_membership!/1 returns the membership with given id" do
      membership = membership_fixture()
      assert Auth.get_membership!(membership.id) == membership
    end

    test "create_membership/1 with valid data creates a membership" do
      assert {:ok, %Membership{} = membership} = Auth.create_membership(@valid_attrs)
    end

    test "create_membership/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_membership(@invalid_attrs)
    end

    test "update_membership/2 with valid data updates the membership" do
      membership = membership_fixture()
      assert {:ok, membership} = Auth.update_membership(membership, @update_attrs)
      assert %Membership{} = membership
    end

    test "update_membership/2 with invalid data returns error changeset" do
      membership = membership_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_membership(membership, @invalid_attrs)
      assert membership == Auth.get_membership!(membership.id)
    end

    test "delete_membership/1 deletes the membership" do
      membership = membership_fixture()
      assert {:ok, %Membership{}} = Auth.delete_membership(membership)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_membership!(membership.id) end
    end

    test "change_membership/1 returns a membership changeset" do
      membership = membership_fixture()
      assert %Ecto.Changeset{} = Auth.change_membership(membership)
    end

  describe "assignments" do
    alias Backend.Auth.Assignment

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def assignment_fixture(attrs \\ %{}) do
      {:ok, assignment} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_assignment()

      assignment
    end

    test "list_assignments/0 returns all assignments" do
      assignment = assignment_fixture()
      assert Auth.list_assignments() == [assignment]
    end

    test "get_assignment!/1 returns the assignment with given id" do
      assignment = assignment_fixture()
      assert Auth.get_assignment!(assignment.id) == assignment
    end

    test "create_assignment/1 with valid data creates a assignment" do
      assert {:ok, %Assignment{} = assignment} = Auth.create_assignment(@valid_attrs)
    end

    test "create_assignment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_assignment(@invalid_attrs)
    end

    test "update_assignment/2 with valid data updates the assignment" do
      assignment = assignment_fixture()
      assert {:ok, assignment} = Auth.update_assignment(assignment, @update_attrs)
      assert %Assignment{} = assignment
    end

    test "update_assignment/2 with invalid data returns error changeset" do
      assignment = assignment_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_assignment(assignment, @invalid_attrs)
      assert assignment == Auth.get_assignment!(assignment.id)
    end

    test "delete_assignment/1 deletes the assignment" do
      assignment = assignment_fixture()
      assert {:ok, %Assignment{}} = Auth.delete_assignment(assignment)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_assignment!(assignment.id) end
    end

    test "change_assignment/1 returns a assignment changeset" do
      assignment = assignment_fixture()
      assert %Ecto.Changeset{} = Auth.change_assignment(assignment)
    end
  end

  describe "questions" do
    alias Backend.Auth.Question

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def question_fixture(attrs \\ %{}) do
      {:ok, question} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_question()

      question
    end

    test "list_questions/0 returns all questions" do
      question = question_fixture()
      assert Auth.list_questions() == [question]
    end

    test "get_question!/1 returns the question with given id" do
      question = question_fixture()
      assert Auth.get_question!(question.id) == question
    end

    test "create_question/1 with valid data creates a question" do
      assert {:ok, %Question{} = question} = Auth.create_question(@valid_attrs)
    end

    test "create_question/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_question(@invalid_attrs)
    end

    test "update_question/2 with valid data updates the question" do
      question = question_fixture()
      assert {:ok, question} = Auth.update_question(question, @update_attrs)
      assert %Question{} = question
    end

    test "update_question/2 with invalid data returns error changeset" do
      question = question_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_question(question, @invalid_attrs)
      assert question == Auth.get_question!(question.id)
    end

    test "delete_question/1 deletes the question" do
      question = question_fixture()
      assert {:ok, %Question{}} = Auth.delete_question(question)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_question!(question.id) end
    end

    test "change_question/1 returns a question changeset" do
      question = question_fixture()
      assert %Ecto.Changeset{} = Auth.change_question(question)
    end
  end

  describe "answers" do
    alias Backend.Auth.Answer

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def answer_fixture(attrs \\ %{}) do
      {:ok, answer} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_answer()

      answer
    end

    test "list_answers/0 returns all answers" do
      answer = answer_fixture()
      assert Auth.list_answers() == [answer]
    end

    test "get_answer!/1 returns the answer with given id" do
      answer = answer_fixture()
      assert Auth.get_answer!(answer.id) == answer
    end

    test "create_answer/1 with valid data creates a answer" do
      assert {:ok, %Answer{} = answer} = Auth.create_answer(@valid_attrs)
    end

    test "create_answer/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_answer(@invalid_attrs)
    end

    test "update_answer/2 with valid data updates the answer" do
      answer = answer_fixture()
      assert {:ok, answer} = Auth.update_answer(answer, @update_attrs)
      assert %Answer{} = answer
    end

    test "update_answer/2 with invalid data returns error changeset" do
      answer = answer_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_answer(answer, @invalid_attrs)
      assert answer == Auth.get_answer!(answer.id)
    end

    test "delete_answer/1 deletes the answer" do
      answer = answer_fixture()
      assert {:ok, %Answer{}} = Auth.delete_answer(answer)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_answer!(answer.id) end
    end

    test "change_answer/1 returns a answer changeset" do
      answer = answer_fixture()
      assert %Ecto.Changeset{} = Auth.change_answer(answer)
    end
  end

  describe "quizzes" do
    alias Backend.Auth.Quiz

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def quiz_fixture(attrs \\ %{}) do
      {:ok, quiz} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_quiz()

      quiz
    end

    test "list_quizzes/0 returns all quizzes" do
      quiz = quiz_fixture()
      assert Auth.list_quizzes() == [quiz]
    end

    test "get_quiz!/1 returns the quiz with given id" do
      quiz = quiz_fixture()
      assert Auth.get_quiz!(quiz.id) == quiz
    end

    test "create_quiz/1 with valid data creates a quiz" do
      assert {:ok, %Quiz{} = quiz} = Auth.create_quiz(@valid_attrs)
    end

    test "create_quiz/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_quiz(@invalid_attrs)
    end

    test "update_quiz/2 with valid data updates the quiz" do
      quiz = quiz_fixture()
      assert {:ok, quiz} = Auth.update_quiz(quiz, @update_attrs)
      assert %Quiz{} = quiz
    end

    test "update_quiz/2 with invalid data returns error changeset" do
      quiz = quiz_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_quiz(quiz, @invalid_attrs)
      assert quiz == Auth.get_quiz!(quiz.id)
    end

    test "delete_quiz/1 deletes the quiz" do
      quiz = quiz_fixture()
      assert {:ok, %Quiz{}} = Auth.delete_quiz(quiz)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_quiz!(quiz.id) end
    end

    test "change_quiz/1 returns a quiz changeset" do
      quiz = quiz_fixture()
      assert %Ecto.Changeset{} = Auth.change_quiz(quiz)
    end
  end

  describe "assignments_to_groupsets" do
    alias Backend.Auth.Assignment_to_groupset

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def assignment_to_groupset_fixture(attrs \\ %{}) do
      {:ok, assignment_to_groupset} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_assignment_to_groupset()

      assignment_to_groupset
    end

    test "list_assignments_to_groupsets/0 returns all assignments_to_groupsets" do
      assignment_to_groupset = assignment_to_groupset_fixture()
      assert Auth.list_assignments_to_groupsets() == [assignment_to_groupset]
    end

    test "get_assignment_to_groupset!/1 returns the assignment_to_groupset with given id" do
      assignment_to_groupset = assignment_to_groupset_fixture()
      assert Auth.get_assignment_to_groupset!(assignment_to_groupset.id) == assignment_to_groupset
    end

    test "create_assignment_to_groupset/1 with valid data creates a assignment_to_groupset" do
      assert {:ok, %Assignment_to_groupset{} = assignment_to_groupset} = Auth.create_assignment_to_groupset(@valid_attrs)
    end

    test "create_assignment_to_groupset/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_assignment_to_groupset(@invalid_attrs)
    end

    test "update_assignment_to_groupset/2 with valid data updates the assignment_to_groupset" do
      assignment_to_groupset = assignment_to_groupset_fixture()
      assert {:ok, assignment_to_groupset} = Auth.update_assignment_to_groupset(assignment_to_groupset, @update_attrs)
      assert %Assignment_to_groupset{} = assignment_to_groupset
    end

    test "update_assignment_to_groupset/2 with invalid data returns error changeset" do
      assignment_to_groupset = assignment_to_groupset_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_assignment_to_groupset(assignment_to_groupset, @invalid_attrs)
      assert assignment_to_groupset == Auth.get_assignment_to_groupset!(assignment_to_groupset.id)
    end

    test "delete_assignment_to_groupset/1 deletes the assignment_to_groupset" do
      assignment_to_groupset = assignment_to_groupset_fixture()
      assert {:ok, %Assignment_to_groupset{}} = Auth.delete_assignment_to_groupset(assignment_to_groupset)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_assignment_to_groupset!(assignment_to_groupset.id) end
    end

    test "change_assignment_to_groupset/1 returns a assignment_to_groupset changeset" do
      assignment_to_groupset = assignment_to_groupset_fixture()
      assert %Ecto.Changeset{} = Auth.change_assignment_to_groupset(assignment_to_groupset)
    end
  end

  describe "pages" do
    alias Backend.Auth.Page

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}
    
    def page_fixture(attrs \\ %{}) do
      {:ok, page} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_page()

      page
    end

    test "list_pages/0 returns all pages" do
      page = page_fixture()
      assert Auth.list_pages() == [page]
    end

    test "get_page!/1 returns the page with given id" do
      page = page_fixture()
      assert Auth.get_page!(page.id) == page
    end

    test "create_page/1 with valid data creates a page" do
      assert {:ok, %Page{} = page} = Auth.create_page(@valid_attrs)
    end

    test "create_page/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_page(@invalid_attrs)
    end

    test "update_page/2 with valid data updates the page" do
      page = page_fixture()
      assert {:ok, page} = Auth.update_page(page, @update_attrs)
      assert %Page{} = page
    end

    test "update_page/2 with invalid data returns error changeset" do
      page = page_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_page(page, @invalid_attrs)
      assert page == Auth.get_page!(page.id)
    end

    test "delete_page/1 deletes the page" do
      page = page_fixture()
      assert {:ok, %Page{}} = Auth.delete_page(page)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_page!(page.id) end
    end

    test "change_page/1 returns a page changeset" do
      page = page_fixture()
      assert %Ecto.Changeset{} = Auth.change_page(page)
    end
  end

  describe "assignments_to_groups" do
    alias Backend.Auth.AssignmentToGroup

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def assignment_to_group_fixture(attrs \\ %{}) do
      {:ok, assignment_to_group} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_assignment_to_group()

      assignment_to_group
    end

    test "list_assignments_to_groups/0 returns all assignments_to_groups" do
      assignment_to_group = assignment_to_group_fixture()
      assert Auth.list_assignments_to_groups() == [assignment_to_group]
    end

    test "get_assignment_to_group!/1 returns the assignment_to_group with given id" do
      assignment_to_group = assignment_to_group_fixture()
      assert Auth.get_assignment_to_group!(assignment_to_group.id) == assignment_to_group
    end

    test "create_assignment_to_group/1 with valid data creates a assignment_to_group" do
      assert {:ok, %AssignmentToGroup{} = assignment_to_group} = Auth.create_assignment_to_group(@valid_attrs)
    end

    test "create_assignment_to_group/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_assignment_to_group(@invalid_attrs)
    end

    test "update_assignment_to_group/2 with valid data updates the assignment_to_group" do
      assignment_to_group = assignment_to_group_fixture()
      assert {:ok, assignment_to_group} = Auth.update_assignment_to_group(assignment_to_group, @update_attrs)
      assert %AssignmentToGroup{} = assignment_to_group
    end

    test "update_assignment_to_group/2 with invalid data returns error changeset" do
      assignment_to_group = assignment_to_group_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_assignment_to_group(assignment_to_group, @invalid_attrs)
      assert assignment_to_group == Auth.get_assignment_to_group!(assignment_to_group.id)
    end

    test "delete_assignment_to_group/1 deletes the assignment_to_group" do
      assignment_to_group = assignment_to_group_fixture()
      assert {:ok, %AssignmentToGroup{}} = Auth.delete_assignment_to_group(assignment_to_group)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_assignment_to_group!(assignment_to_group.id) end
    end

    test "change_assignment_to_group/1 returns a assignment_to_group changeset" do
      assignment_to_group = assignment_to_group_fixture()
      assert %Ecto.Changeset{} = Auth.change_assignment_to_group(assignment_to_group)
    end
  end

  describe "assignments_to_users" do
    alias Backend.Auth.AssignmentToUser

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def assignment_to_user_fixture(attrs \\ %{}) do
      {:ok, assignment_to_user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_assignment_to_user()

      assignment_to_user
    end

    test "list_assignments_to_users/0 returns all assignments_to_users" do
      assignment_to_user = assignment_to_user_fixture()
      assert Auth.list_assignments_to_users() == [assignment_to_user]
    end

    test "get_assignment_to_user!/1 returns the assignment_to_user with given id" do
      assignment_to_user = assignment_to_user_fixture()
      assert Auth.get_assignment_to_user!(assignment_to_user.id) == assignment_to_user
    end

    test "create_assignment_to_user/1 with valid data creates a assignment_to_user" do
      assert {:ok, %AssignmentToUser{} = assignment_to_user} = Auth.create_assignment_to_user(@valid_attrs)
    end

    test "create_assignment_to_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_assignment_to_user(@invalid_attrs)
    end

    test "update_assignment_to_user/2 with valid data updates the assignment_to_user" do
      assignment_to_user = assignment_to_user_fixture()
      assert {:ok, assignment_to_user} = Auth.update_assignment_to_user(assignment_to_user, @update_attrs)
      assert %AssignmentToUser{} = assignment_to_user
    end

    test "update_assignment_to_user/2 with invalid data returns error changeset" do
      assignment_to_user = assignment_to_user_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_assignment_to_user(assignment_to_user, @invalid_attrs)
      assert assignment_to_user == Auth.get_assignment_to_user!(assignment_to_user.id)
    end

    test "delete_assignment_to_user/1 deletes the assignment_to_user" do
      assignment_to_user = assignment_to_user_fixture()
      assert {:ok, %AssignmentToUser{}} = Auth.delete_assignment_to_user(assignment_to_user)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_assignment_to_user!(assignment_to_user.id) end
    end

    test "change_assignment_to_user/1 returns a assignment_to_user changeset" do
      assignment_to_user = assignment_to_user_fixture()
      assert %Ecto.Changeset{} = Auth.change_assignment_to_user(assignment_to_user)
    end
  end

  describe "submissions" do
    alias Backend.Auth.Submission

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def submission_fixture(attrs \\ %{}) do
      {:ok, submission} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_submission()

      submission
    end

    test "list_submissions/0 returns all submissions" do
      submission = submission_fixture()
      assert Auth.list_submissions() == [submission]
    end

    test "get_submission!/1 returns the submission with given id" do
      submission = submission_fixture()
      assert Auth.get_submission!(submission.id) == submission
    end

    test "create_submission/1 with valid data creates a submission" do
      assert {:ok, %Submission{} = submission} = Auth.create_submission(@valid_attrs)
    end

    test "create_submission/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_submission(@invalid_attrs)
    end

    test "update_submission/2 with valid data updates the submission" do
      submission = submission_fixture()
      assert {:ok, submission} = Auth.update_submission(submission, @update_attrs)
      assert %Submission{} = submission
    end

    test "update_submission/2 with invalid data returns error changeset" do
      submission = submission_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_submission(submission, @invalid_attrs)
      assert submission == Auth.get_submission!(submission.id)
    end

    test "delete_submission/1 deletes the submission" do
      submission = submission_fixture()
      assert {:ok, %Submission{}} = Auth.delete_submission(submission)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_submission!(submission.id) end
    end

    test "change_submission/1 returns a submission changeset" do
      submission = submission_fixture()
      assert %Ecto.Changeset{} = Auth.change_submission(submission)
    end
  end

  describe "grades" do
    alias Backend.Auth.Grade

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def grade_fixture(attrs \\ %{}) do
      {:ok, grade} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Auth.create_grade()

      grade
    end

    test "list_grades/0 returns all grades" do
      grade = grade_fixture()
      assert Auth.list_grades() == [grade]
    end

    test "get_grade!/1 returns the grade with given id" do
      grade = grade_fixture()
      assert Auth.get_grade!(grade.id) == grade
    end

    test "create_grade/1 with valid data creates a grade" do
      assert {:ok, %Grade{} = grade} = Auth.create_grade(@valid_attrs)
    end

    test "create_grade/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Auth.create_grade(@invalid_attrs)
    end

    test "update_grade/2 with valid data updates the grade" do
      grade = grade_fixture()
      assert {:ok, grade} = Auth.update_grade(grade, @update_attrs)
      assert %Grade{} = grade
    end

    test "update_grade/2 with invalid data returns error changeset" do
      grade = grade_fixture()
      assert {:error, %Ecto.Changeset{}} = Auth.update_grade(grade, @invalid_attrs)
      assert grade == Auth.get_grade!(grade.id)
    end

    test "delete_grade/1 deletes the grade" do
      grade = grade_fixture()
      assert {:ok, %Grade{}} = Auth.delete_grade(grade)
      assert_raise Ecto.NoResultsError, fn -> Auth.get_grade!(grade.id) end
    end

    test "change_grade/1 returns a grade changeset" do
      grade = grade_fixture()
      assert %Ecto.Changeset{} = Auth.change_grade(grade)
    end
  end
end
