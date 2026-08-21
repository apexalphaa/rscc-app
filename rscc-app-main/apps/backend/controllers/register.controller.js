const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "viewer",
    phone,
    academy: "Rising Star Cricket Club",
});
