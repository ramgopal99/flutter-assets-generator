# Flutter Assets Generator

![Flutter Assets Generator](images/logo.png)

A powerful VSCode extension that streamlines Flutter asset management by automatically generating type-safe Dart constants for your assets. Say goodbye to manual asset path management and hello to type-safe, auto-completing asset references!

[![Version](https://img.shields.io/visual-studio-marketplace/v/your-publisher.flutter-assets-generator)](https://marketplace.visualstudio.com/items?itemName=your-publisher.flutter-assets-generator)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/your-publisher.flutter-assets-generator)](https://marketplace.visualstudio.com/items?itemName=your-publisher.flutter-assets-generator)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/your-publisher.flutter-assets-generator)](https://marketplace.visualstudio.com/items?itemName=your-publisher.flutter-assets-generator)

## Features

- **Real-time Asset Watching**: Automatically generates constants when assets change
- **Type-safe Asset References**: No more string typos in asset paths
- **Package Support**: Full support for Flutter package assets
- **Customizable Output**: Configure class names, prefixes, and more
- **Rich Documentation**: Generated code includes helpful comments and documentation
- **Easy Integration**: Simple configuration in your pubspec.yaml

## Installation

1. Open VSCode
2. Press `Ctrl+P` (or `Cmd+P` on macOS)
3. Type `ext install flutter-assets-generator`
4. Press Enter

You can also install it directly from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=your-publisher.flutter-assets-generator).

## Quick Start

1. Add configuration to your `pubspec.yaml`:
```yaml
flutter_assets:
  assets_path: assets/
  output_path: lib/constants/
  filename: assets.dart
```

2. Press `F1` and run "Flutter Assets: Watch"
3. Add images to your assets folder
4. Use the generated constants in your code:
```dart
import 'constants/assets.dart';

Image.asset(Assets.assetsImagesLogo)
```

## Configuration Options

### Basic Configuration
```yaml
flutter_assets:
  assets_path: assets/
  output_path: lib/constants/
  filename: assets.dart
```

### Advanced Configuration
```yaml
flutter_assets:
  # Multiple asset paths
  assets_path: 
    - assets/images/
    - assets/icons/
    - assets/fonts/
  
  # Output configuration
  output_path: lib/constants/
  filename: assets.dart
  
  # Customize generated code
  field_prefix: resource    # Optional: prefix for constants
  classname: R             # Optional: generated class name
  ignore_comments: true    # Optional: skip comment generation
  
  # Package support
  package_name: my_package # Optional: for package assets
```

### Configuration Options Explained

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `assets_path` | String/Array | - | Path(s) to asset directories |
| `output_path` | String | - | Directory for generated file |
| `filename` | String | "assets.dart" | Name of generated file |
| `field_prefix` | String | "assets" | Prefix for asset constants |
| `classname` | String | "Assets" | Name of generated class |
| `ignore_comments` | Boolean | false | Skip generating comments |
| `package_name` | String | - | Package name for package assets |

## Available Commands

Access these commands via the Command Palette (`F1` or `Ctrl+Shift+P`):

- **Flutter Assets: Watch** - Start watching asset changes
  - Automatically generates constants when assets change
  - Real-time updates as you add/remove assets
  
- **Flutter Assets: Stop Watch** - Stop watching asset changes
  - Stops the automatic generation
  - Use when you want to pause asset watching
  
- **Flutter Assets: Generate** - Generate assets file manually
  - One-time generation of asset constants
  - Useful for CI/CD pipelines

## Generated Code Example

```dart
// ignore_for_file: prefer_single_quotes

class Assets {
  Assets._();

  /// Assets for loginLogo
  /// assets/images/login/logo.png
  static const String assetsImagesLoginLogo = "assets/images/login/logo.png";

  /// Assets for tabHome
  /// assets/images/tab/home.png
  static const String assetsImagesTabHome = "assets/images/tab/home.png";
}
```

## Package Assets Support

For Flutter packages, use this configuration:

```yaml
flutter_assets:
  assets_path:
    - lib/assets/images/
  output_path: lib/
  filename: assets.dart
  package_name: my_package
```

This generates package URLs like:
```dart
static const String imageIcon = "packages/my_package/lib/assets/images/icon.png";
```

## Best Practices

1. **Asset Organization**
   - Keep assets in organized subdirectories
   - Use meaningful file names
   - Group similar assets together

2. **Configuration**
   - Use multiple asset paths for better organization
   - Choose meaningful class and constant names
   - Consider using a custom prefix for better code completion

3. **Usage**
   - Import the generated file once in a barrel file
   - Use constants instead of hard-coded strings
   - Keep the watch mode active during development

## Common Issues and Solutions

### Issue: Assets not generating
- Ensure paths in pubspec.yaml are correct
- Check if the watch command is active
- Verify file permissions

### Issue: Wrong asset paths
- Check your assets_path configuration
- Ensure pubspec.yaml is properly formatted
- Verify asset files exist in specified directories

### Issue: Package assets not working
- Verify package_name is correctly set
- Ensure assets are in the correct package directory
- Check package dependency is properly set up

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Create an issue on GitHub
- Star the repository if you find it helpful
- Follow for updates

## Acknowledgments

- Flutter team for the amazing framework
- VSCode team for the extensible editor
- All contributors who help improve this extension

---

Made with ❤️ by Ramgopal Bagh
