import 'package:flutter/material.dart';
import 'shop.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool isLogin = true;
  bool _obscure = true;
  bool _obscureConfirm = true;
  final _formKey = GlobalKey<FormState>();
  final _userController = TextEditingController();
  final _passController = TextEditingController();
  final _nameController = TextEditingController();
  final _confirmPassController = TextEditingController();

  // Dark Green Theme Colors
  final Color _primaryColor = const Color(0xFF1B5E20); // Dark Green
  final Color _accentColor = const Color(0xFF4CAF50); // Standard Green
  final Color _lightBgColor = const Color(0xFFE8F5E9); // Light Green tint

  void _showDialog(String title, String message, {bool success = false}) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
        title: Text(title,
            style: TextStyle(color: success ? _primaryColor : Colors.red)),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("OK", style: TextStyle(color: Colors.black)),
          )
        ],
      ),
    );
  }

  void _onLogin() async {
    if (_formKey.currentState!.validate()) {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => Center(
          child: CircularProgressIndicator(color: _accentColor),
        ),
      );
      await Future.delayed(const Duration(seconds: 1));
      if (mounted) Navigator.of(context).pop();
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => NepalShopApp()),
        );
      }
    }
  }

  void _onSignIn() async {
    if (_formKey.currentState!.validate()) {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => Center(
          child: CircularProgressIndicator(color: _accentColor),
        ),
      );
      await Future.delayed(const Duration(seconds: 1));
      if (mounted) Navigator.of(context).pop();
      if (mounted) {
        _showDialog("Sign Up Successful", "Welcome, ${_nameController.text}!",
            success: true);
        // Optionally, clear fields
        _userController.clear();
        _passController.clear();
        _nameController.clear();
        _confirmPassController.clear();
        setState(() {
          isLogin = true; // Switch back to login after successful sign up
        });
      }
    }
  }

  void _onSocial(String name) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("$name login clicked!"),
        backgroundColor: _primaryColor,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _primaryColor,
      body: Center(
        child: SingleChildScrollView(
          child: Stack(
            children: [
              // Green curved header
              Container(
                height: 340,
                decoration: BoxDecoration(
                  color: _primaryColor,
                  borderRadius: const BorderRadius.only(
                    bottomRight: Radius.circular(90),
                  ),
                ),
              ),
              Column(
                children: [
                  const SizedBox(height: 56),
                  // Header text
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 36),
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ShaderMask(
                            shaderCallback: (Rect bounds) {
                              return LinearGradient(
                                colors: [
                                  const Color(0xFFC8E6C9),
                                  const Color(0xFF81C784)
                                ],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              ).createShader(bounds);
                            },
                            child: const Text(
                              "नमस्ते!",
                              style: TextStyle(
                                fontSize: 38,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                                letterSpacing: 1.5,
                                shadows: [
                                  Shadow(
                                    blurRadius: 8,
                                    color: Colors.black26,
                                    offset: Offset(2, 2),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Row(
                            children: const [
                              Icon(Icons.storefront,
                                  color: Colors.white70, size: 32),
                              SizedBox(width: 8),
                              Text(
                                "पसलेमा स्वागत छ",
                                style: TextStyle(
                                  fontSize: 28,
                                  color: Colors.white,
                                  fontWeight: FontWeight.w600,
                                  letterSpacing: 1.2,
                                  shadows: [
                                    Shadow(
                                      blurRadius: 6,
                                      color: Colors.black26,
                                      offset: Offset(1, 2),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 52),
                  // White card with tabs and form
                  Container(
                    margin: const EdgeInsets.symmetric(horizontal: 22),
                    padding: const EdgeInsets.symmetric(
                        vertical: 36, horizontal: 18),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(36),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          blurRadius: 20,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: Column(
                      children: [
                        // Tabs
                        Container(
                          decoration: BoxDecoration(
                            color: _lightBgColor,
                            borderRadius: BorderRadius.circular(30),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: GestureDetector(
                                  onTap: () => setState(() => isLogin = true),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: isLogin
                                          ? _primaryColor
                                          : Colors.transparent,
                                      borderRadius: BorderRadius.circular(30),
                                    ),
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 14),
                                    child: Center(
                                      child: Text(
                                        "Log In",
                                        style: TextStyle(
                                          color: isLogin
                                              ? Colors.white
                                              : _primaryColor,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 17,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                child: GestureDetector(
                                  onTap: () => setState(() => isLogin = false),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: !isLogin
                                          ? _primaryColor
                                          : Colors.transparent,
                                      borderRadius: BorderRadius.circular(30),
                                    ),
                                    padding: const EdgeInsets.symmetric(
                                        vertical: 14),
                                    child: Center(
                                      child: Text(
                                        "Sign In",
                                        style: TextStyle(
                                          color: !isLogin
                                              ? Colors.white
                                              : _primaryColor,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 17,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 22),
                        // Form
                        Form(
                          key: _formKey,
                          child: Column(
                            children: [
                              if (!isLogin) ...[
                                // Name field for sign up
                                TextFormField(
                                  controller: _nameController,
                                  decoration: InputDecoration(
                                    hintText: "Full Name",
                                    contentPadding: const EdgeInsets.symmetric(
                                        vertical: 18, horizontal: 22),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(28),
                                      borderSide: BorderSide.none,
                                    ),
                                    filled: true,
                                    fillColor: _lightBgColor,
                                    prefixIcon: Icon(Icons.person_outline,
                                        color: _primaryColor),
                                  ),
                                  validator: (v) {
                                    if (!isLogin &&
                                        (v == null || v.trim().length < 2)) {
                                      return "Enter your name";
                                    }
                                    return null;
                                  },
                                ),
                                const SizedBox(height: 16),
                              ],
                              // Username
                              TextFormField(
                                controller: _userController,
                                decoration: InputDecoration(
                                  hintText: "Username or Email",
                                  contentPadding: const EdgeInsets.symmetric(
                                      vertical: 18, horizontal: 22),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(28),
                                    borderSide: BorderSide.none,
                                  ),
                                  filled: true,
                                  fillColor: _lightBgColor,
                                  prefixIcon: Icon(Icons.email_outlined,
                                      color: _primaryColor),
                                ),
                                validator: (v) =>
                                    v == null || v.isEmpty ? "Required" : null,
                              ),
                              const SizedBox(height: 16),
                              // Password
                              TextFormField(
                                controller: _passController,
                                obscureText: _obscure,
                                decoration: InputDecoration(
                                  hintText: "Password",
                                  contentPadding: const EdgeInsets.symmetric(
                                      vertical: 18, horizontal: 22),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(28),
                                    borderSide: BorderSide.none,
                                  ),
                                  filled: true,
                                  fillColor: _lightBgColor,
                                  prefixIcon: Icon(Icons.lock_outline,
                                      color: _primaryColor),
                                  suffixIcon: IconButton(
                                    icon: Icon(
                                        _obscure
                                            ? Icons.visibility
                                            : Icons.visibility_off,
                                        color: _primaryColor),
                                    onPressed: () =>
                                        setState(() => _obscure = !_obscure),
                                  ),
                                ),
                                validator: (v) {
                                  if (v == null || v.isEmpty) return "Required";
                                  if (v.length < 6) return "Min 6 chars";
                                  return null;
                                },
                              ),
                              if (!isLogin) ...[
                                const SizedBox(height: 16),
                                // Confirm Password
                                TextFormField(
                                  controller: _confirmPassController,
                                  obscureText: _obscureConfirm,
                                  decoration: InputDecoration(
                                    hintText: "Confirm Password",
                                    contentPadding: const EdgeInsets.symmetric(
                                        vertical: 18, horizontal: 22),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(28),
                                      borderSide: BorderSide.none,
                                    ),
                                    filled: true,
                                    fillColor: _lightBgColor,
                                    prefixIcon: Icon(Icons.lock_reset,
                                        color: _primaryColor),
                                    suffixIcon: IconButton(
                                      icon: Icon(
                                          _obscureConfirm
                                              ? Icons.visibility
                                              : Icons.visibility_off,
                                          color: _primaryColor),
                                      onPressed: () => setState(() =>
                                          _obscureConfirm = !_obscureConfirm),
                                    ),
                                  ),
                                  validator: (v) {
                                    if (!isLogin && v != _passController.text) {
                                      return "Passwords do not match";
                                    }
                                    return null;
                                  },
                                ),
                              ],
                              const SizedBox(height: 20),
                              SizedBox(
                                width: double.infinity,
                                height: 50,
                                child: ElevatedButton(
                                  onPressed: isLogin ? _onLogin : _onSignIn,
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: _primaryColor,
                                    shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(30)),
                                    elevation: 5,
                                  ),
                                  child: Text(
                                    isLogin ? "Log In" : "Sign In",
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18,
                                        color: Colors.white),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 18),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                                height: 1, width: 32, color: Colors.grey[300]),
                            const Padding(
                              padding: EdgeInsets.symmetric(horizontal: 8),
                              child: Text("or",
                                  style: TextStyle(
                                      fontSize: 14, color: Colors.black54)),
                            ),
                            Container(
                                height: 1, width: 32, color: Colors.grey[300]),
                          ],
                        ),
                        const SizedBox(height: 10),
                        // Social buttons
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.facebook,
                                  color: Color(0xFF1877F2), size: 32),
                              onPressed: () => _onSocial("Facebook"),
                            ),
                            const SizedBox(width: 8),
                            IconButton(
                              icon: Icon(Icons.g_mobiledata,
                                  color: Colors.red[700], size: 40),
                              onPressed: () => _onSocial("Google"),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
