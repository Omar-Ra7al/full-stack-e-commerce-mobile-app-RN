import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { View, Text, Pressable, TextInput } from "react-native";
import ScreenWraper from "@/components/shared/ScreenWraper";
import { clientAuth } from "@/lib/client";
import { useRouter } from "expo-router";

const Signup = () => {
  const router = useRouter();
  const signUpSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
  });
  type SignUpForm = z.infer<typeof signUpSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignUpForm) => {
    console.log("valid data:", data);
    const res = await clientAuth.signup(data.email, data.password);
    if (res.success) {
      alert("Account created successfully");
      router.push("/home");
    } else {
      alert("Failed to create account");
    }
    reset();
  };

  return (
    <ScreenWraper className="flex justify-center items-center">
      <View className="w-full p-4 gap-6 border bg-secondary/5 border-secondary rounded-2xl">
        {/* Heading */}
        <View className="items-center gap-1">
          <Text className="text-2xl font-bold text-secondary">
            Create Account
          </Text>
          <Text className="text-sm text-zinc-500 text-center">
            Sign up to get started with your account
          </Text>
        </View>

        {/* Form */}
        <View className="w-full items-center gap-4">
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="text-secondary border border-zinc-300 rounded-xl px-4 py-3 w-full"
                />
                {!!errors.email?.message && (
                  <Text className="text-red-500 text-sm">
                    {errors.email.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Password"
                  secureTextEntry
                  className="text-secondary border border-zinc-300 rounded-xl px-4 py-3 w-full"
                />
                {!!errors.password?.message && (
                  <Text className="text-red-500 text-sm">
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />

          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={`rounded-xl border border-secondary px-4 py-3 items-center w-full ${
              isSubmitting ? "opacity-50" : ""
            }`}
          >
            <Text className="font-medium text-secondary">
              {isSubmitting ? "Loading..." : "Signup"}
            </Text>
          </Pressable>
        </View>

        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-zinc-500 text-sm">
            Already have an account?
          </Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text className="font-medium text-secondary">Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWraper>
  );
};

export default Signup;
