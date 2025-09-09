import 'package:flutter/material.dart';
import '../utils/app_theme.dart';

class SOSScreen extends StatefulWidget {
  const SOSScreen({super.key});

  @override
  State<SOSScreen> createState() => _SOSScreenState();
}

class _SOSScreenState extends State<SOSScreen> with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;
  bool _isEmergencyActivated = false;
  int _countdown = 0;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(seconds: 1),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _activateEmergency() {
    setState(() {
      _isEmergencyActivated = true;
      _countdown = 10;
    });
    
    _pulseController.repeat(reverse: true);
    
    // Start countdown
    _startCountdown();
  }

  void _startCountdown() {
    Future.delayed(const Duration(seconds: 1), () {
      if (_countdown > 0 && _isEmergencyActivated) {
        setState(() {
          _countdown--;
        });
        _startCountdown();
      } else if (_countdown == 0 && _isEmergencyActivated) {
        _sendEmergencyAlert();
      }
    });
  }

  void _sendEmergencyAlert() {
    // Here you would send the actual emergency alert
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Emergency alert sent! Help is on the way.'),
        backgroundColor: AppTheme.primaryRed,
        duration: Duration(seconds: 3),
      ),
    );
    
    setState(() {
      _isEmergencyActivated = false;
    });
    _pulseController.stop();
  }

  void _cancelEmergency() {
    setState(() {
      _isEmergencyActivated = false;
      _countdown = 0;
    });
    _pulseController.stop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Emergency SOS'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: Container(
        decoration: AppTheme.primaryGradient,
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              children: [
                // Warning Text
                if (!_isEmergencyActivated) ...[
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: AppTheme.glassEffect,
                    child: Column(
                      children: [
                        const Icon(
                          Icons.warning,
                          color: Colors.amber,
                          size: 40,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Emergency SOS',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Press and hold the button below to send an emergency alert to authorities and your emergency contacts.',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: Colors.white.withOpacity(0.9),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 40),
                ],
                
                // Countdown Display
                if (_isEmergencyActivated) ...[
                  Container(
                    padding: const EdgeInsets.all(30),
                    decoration: AppTheme.glassEffect,
                    child: Column(
                      children: [
                        Text(
                          'Emergency Alert in:',
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          '$_countdown',
                          style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                            color: Colors.white,
                            fontSize: 72,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Tap Cancel to stop',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: Colors.white.withOpacity(0.8),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 40),
                ],
                
                // Emergency Button
                Expanded(
                  child: Center(
                    child: AnimatedBuilder(
                      animation: _pulseAnimation,
                      builder: (context, child) {
                        return Transform.scale(
                          scale: _isEmergencyActivated ? _pulseAnimation.value : 1.0,
                          child: GestureDetector(
                            onLongPress: _isEmergencyActivated ? null : _activateEmergency,
                            child: Container(
                              width: 200,
                              height: 200,
                              decoration: BoxDecoration(
                                color: _isEmergencyActivated ? AppTheme.primaryRed : AppTheme.primaryRed.withOpacity(0.8),
                                shape: BoxShape.circle,
                                boxShadow: [
                                  BoxShadow(
                                    color: AppTheme.primaryRed.withOpacity(0.3),
                                    blurRadius: 20,
                                    spreadRadius: 5,
                                  ),
                                ],
                              ),
                              child: const Center(
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.emergency,
                                      color: Colors.white,
                                      size: 60,
                                    ),
                                    SizedBox(height: 8),
                                    Text(
                                      'SOS',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 24,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
                
                // Instructions or Cancel Button
                if (_isEmergencyActivated)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _cancelEmergency,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: AppTheme.primaryRed,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                      child: const Text(
                        'Cancel Emergency',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  )
                else
                  Text(
                    'Long press the SOS button to activate emergency alert',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: Colors.white.withOpacity(0.8),
                    ),
                    textAlign: TextAlign.center,
                  ),
                
                const SizedBox(height: 20),
                
                // Emergency Contacts
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: AppTheme.glassEffect,
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          _buildQuickContact('Police', Icons.local_police, '911'),
                          _buildQuickContact('Medical', Icons.local_hospital, '911'),
                          _buildQuickContact('Fire', Icons.local_fire_department, '911'),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildQuickContact(String label, IconData icon, String number) {
    return GestureDetector(
      onTap: () {
        // Here you would implement actual calling functionality
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Calling $label: $number')),
        );
      },
      child: Column(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(25),
            ),
            child: Icon(icon, color: Colors.white, size: 24),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 12,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
